import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

let ephemeralDevSecret: string | null = null;

/**
 * Resolves the JWT signing secret from environment configuration.
 * Never falls back to a static hardcoded secret string:
 * - In production, throws immediately if JWT_SECRET is missing or too short.
 * - In development/test, generates a cryptographically random ephemeral key
 *   shared across the running process when JWT_SECRET is not configured.
 */
export function resolveJwtSecret(configService: ConfigService): string {
  const configured = configService.get<string>('JWT_SECRET')?.trim();

  if (configured && configured.length >= 16) {
    return configured;
  }

  const nodeEnv = configService.get<string>('NODE_ENV') || process.env.NODE_ENV;
  if (nodeEnv === 'production') {
    throw new Error(
      'JWT_SECRET environment variable must be set (min 16 characters) in production.',
    );
  }

  if (!ephemeralDevSecret) {
    ephemeralDevSecret = randomBytes(32).toString('hex');
  }

  return ephemeralDevSecret;
}
