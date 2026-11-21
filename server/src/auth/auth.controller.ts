import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: string;
    email: string;
    fullName: string;
    shopName: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Initiates the Google OAuth consent flow via passport-google-oauth20
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

    try {
      const result = await this.authService.validateOAuthUser(req.user);
      const params = new URLSearchParams({
        token: result.token,
        userId: result.user.id,
        fullName: result.user.fullName,
        email: result.user.email,
        shopName: result.user.shopName,
      });

      return res.redirect(`${frontendUrl}/auth/callback?${params.toString()}`);
    } catch (error: any) {
      const err = encodeURIComponent(
        error?.message || 'Google authentication failed',
      );
      return res.redirect(`${frontendUrl}/login?error=${err}`);
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.userId);
  }
}
