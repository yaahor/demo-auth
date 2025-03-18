import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export function jwtModuleOptionsFactory(
  configService: ConfigService,
): JwtModuleOptions {
  return {
    secret: configService.getOrThrow('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  };
}
