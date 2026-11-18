import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    const user = this.userRepository.create({
      email: registerDto.email,
      passwordHash,
      shopName: registerDto.shopName,
      phone: registerDto.phone,
    });

    const savedUser = await this.userRepository.save(user);

    const token = this.generateToken(savedUser);
    return {
      message: 'Registration successful',
      token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        shopName: savedUser.shopName,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);
    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        shopName: user.shopName,
      },
    };
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email, shopName: user.shopName };
    return this.jwtService.sign(payload);
  }
}
