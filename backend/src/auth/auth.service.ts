import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mapUserRoleToDtoUserRole } from '../api/map-user-role-to-dto-user-role';
import { UserEntityService } from '../database/user/user-entity.service';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../database/user/user.entity';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userEntityService: UserEntityService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userEntityService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  createToken(user: UserEntity): string {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.jwtService.sign(payload);
  }
}
