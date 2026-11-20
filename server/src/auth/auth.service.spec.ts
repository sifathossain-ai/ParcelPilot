jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => undefined,
}));

jest.mock('@nestjs/jwt', () => ({
  JwtService: class JwtService {},
}));

jest.mock('typeorm', () => ({
  Repository: class Repository {},
}));

jest.mock('../users/entities/user.entity', () => ({
  User: class User {},
}));

import { ConflictException, UnauthorizedException } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import type { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<Partial<Repository<User>>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  beforeEach(() => {
    userRepository = {
      findOne: jest.fn(),
      create: jest.fn((data) => data as User),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('signed-jwt-token'),
    };
    authService = new AuthService(
      userRepository as unknown as Repository<User>,
      jwtService as unknown as JwtService,
    );
  });

  it('registers a merchant with bcrypt-hashed password and normalized email', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue(null);
    (userRepository.save as jest.Mock).mockImplementation(async (user: User) => ({
      ...user,
      id: 'user-uuid-1',
    }));

    const result = await authService.register({
      fullName: '  Tanvir Ahmed  ',
      shopName: '  Dhaka Trends  ',
      email: '  Merchant@Brand.COM  ',
      password: 'StrongPassword#2026',
      termsAccepted: true,
    });

    expect(userRepository.create).toHaveBeenCalledTimes(1);
    const createdArg = (userRepository.create as jest.Mock).mock.calls[0][0];
    expect(createdArg.email).toBe('merchant@brand.com');
    expect(createdArg.fullName).toBe('Tanvir Ahmed');
    expect(createdArg.shopName).toBe('Dhaka Trends');
    expect(createdArg.passwordHash).not.toBe('StrongPassword#2026');
    expect(
      await bcrypt.compare('StrongPassword#2026', createdArg.passwordHash),
    ).toBe(true);

    expect(result.token).toBe('signed-jwt-token');
    expect(result.user).toEqual({
      id: 'user-uuid-1',
      fullName: 'Tanvir Ahmed',
      email: 'merchant@brand.com',
      shopName: 'Dhaka Trends',
    });
    expect(
      (result.user as Record<string, unknown>).passwordHash,
    ).toBeUndefined();
  });

  it('rejects duplicate email registration with ConflictException', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue({
      id: 'existing-id',
      email: 'merchant@brand.com',
    });

    await expect(
      authService.register({
        fullName: 'Tanvir Ahmed',
        shopName: 'Dhaka Trends',
        email: 'MERCHANT@brand.com',
        password: 'StrongPassword#2026',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('rejects login with invalid password using generic UnauthorizedException', async () => {
    const hash = await bcrypt.hash('CorrectPassword#1', 10);
    const queryBuilder = {
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({
        id: 'user-uuid-1',
        fullName: 'Tanvir Ahmed',
        email: 'merchant@brand.com',
        shopName: 'Dhaka Trends',
        passwordHash: hash,
      }),
    };
    (userRepository.createQueryBuilder as jest.Mock).mockReturnValue(
      queryBuilder,
    );

    await expect(
      authService.login({
        email: 'merchant@brand.com',
        password: 'WrongPassword#1',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('validates RegisterDto input rules and accepts omitted optional phone', async () => {
    const validDto = plainToInstance(RegisterDto, {
      fullName: '  Tanvir Ahmed  ',
      shopName: '  Dhaka Trends  ',
      email: '  Merchant@Brand.com  ',
      password: 'StrongPassword#2026',
      termsAccepted: true,
    });
    const validErrors = await validate(validDto);
    expect(validErrors).toHaveLength(0);
    expect(validDto.email).toBe('merchant@brand.com');
    expect(validDto.fullName).toBe('Tanvir Ahmed');

    const weakDto = plainToInstance(RegisterDto, {
      fullName: 'A',
      shopName: '',
      email: 'invalid-email',
      password: 'weak',
    });
    const weakErrors = await validate(weakDto);
    expect(weakErrors.map((e) => e.property)).toEqual(
      expect.arrayContaining(['fullName', 'shopName', 'email', 'password']),
    );
  });
});
