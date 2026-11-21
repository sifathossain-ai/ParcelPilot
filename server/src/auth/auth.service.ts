import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const BCRYPT_SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const normalizedEmail = registerDto.email.trim().toLowerCase();

    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(
      registerDto.password,
      BCRYPT_SALT_ROUNDS,
    );

    const user = this.userRepository.create({
      fullName: registerDto.fullName.trim(),
      shopName: registerDto.shopName.trim(),
      email: normalizedEmail,
      passwordHash,
      phone: registerDto.phone?.trim() || undefined,
    });

    let savedUser: User;
    try {
      savedUser = await this.userRepository.save(user);
    } catch (error: unknown) {
      const pgCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code?: unknown }).code)
          : undefined;
      if (pgCode === '23505') {
        throw new ConflictException('An account with this email already exists');
      }
      throw error;
    }

    const token = this.generateToken(savedUser);
    return {
      message: 'Registration successful',
      token,
      user: {
        id: savedUser.id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        shopName: savedUser.shopName,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const normalizedEmail = loginDto.email.trim().toLowerCase();

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: normalizedEmail })
      .getOne();

    if (!user || !user.passwordHash) {
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
        fullName: user.fullName,
        email: user.email,
        shopName: user.shopName,
      },
    };
  }

  async validateOAuthUser(profile: {
    googleId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  }) {
    const normalizedEmail = (profile.email || '').trim().toLowerCase();
    if (!normalizedEmail) {
      throw new UnauthorizedException('Google account must have an email address');
    }

    let user = await this.userRepository.findOne({
      where: [{ email: normalizedEmail }, { googleId: profile.googleId }],
    });

    if (user) {
      let needsUpdate = false;
      if (!user.googleId) {
        user.googleId = profile.googleId;
        needsUpdate = true;
      }
      if (profile.avatarUrl && !user.avatarUrl) {
        user.avatarUrl = profile.avatarUrl;
        needsUpdate = true;
      }
      if (!user.fullName && profile.fullName) {
        user.fullName = profile.fullName;
        needsUpdate = true;
      }
      if (needsUpdate) {
        user = await this.userRepository.save(user);
      }
    } else {
      user = this.userRepository.create({
        email: normalizedEmail,
        fullName: profile.fullName || 'Google Merchant',
        shopName: `${profile.fullName || 'Merchant'}'s Store`,
        googleId: profile.googleId,
        avatarUrl: profile.avatarUrl,
        provider: 'google',
      });
      user = await this.userRepository.save(user);
    }

    const token = this.generateToken(user);
    return {
      message: 'Google authentication successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        shopName: user.shopName,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        shopName: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User account not found');
    }

    return { user };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      shopName: user.shopName,
    };
    return this.jwtService.sign(payload);
  }
}
