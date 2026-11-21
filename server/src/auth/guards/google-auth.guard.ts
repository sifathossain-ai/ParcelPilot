import {
  Injectable,
  ExecutionContext,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly configService: ConfigService) {
    super({
      accessType: 'offline',
      prompt: 'select_account',
    });
  }

  canActivate(context: ExecutionContext) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId || clientId.includes('placeholder')) {
      throw new ServiceUnavailableException(
        'Google OAuth credentials are not configured yet. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to server/.env.',
      );
    }
    return super.canActivate(context);
  }
}
