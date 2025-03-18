import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { mapDtoUserRoleToUserRole } from '../api/map-dto-user-role-to-user-role';
import { CurrentUser } from './current-user';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): Promise<CurrentUser> {
    return Promise.resolve({
      id: payload.id,
      username: payload.username,
      role: mapDtoUserRoleToUserRole(payload.role),
    });
  }
}
