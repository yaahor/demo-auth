import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggedInDto } from '@shared/logged-in.dto';
import { LoginDto } from '@shared/login.dto';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserCreatedDto } from '@shared/user-created.dto';
import { UserEditDto } from '@shared/user-edit.dto';
import { UserEditedDto } from '@shared/user-edited.dto';
import { UserListDto } from '@shared/user-list.dto';
import { mapDtoUserRoleToUserRole } from './api/map-dto-user-role-to-user-role';
import { mapUserEntityToUserListItem } from './api/map-user-entity-to-user-list-item';
import { mapUserRoleToDtoUserRole } from './api/map-user-role-to-dto-user-role';
import { AuthService } from './auth/auth.service';
import { UserEntityService } from './database/user/user-entity.service';
import { UserEntity } from './database/user/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly userEntityService: UserEntityService,
  ) {}

  /**
   * @todo check user role in DB?
   * @param dto
   */
  async createUser(dto: UserCreateDto): Promise<UserCreatedDto> {
    const user = new UserEntity();
    user.username = dto.username;
    user.password = await this.authService.hashPassword(dto.password);
    user.role = mapDtoUserRoleToUserRole(dto.role);

    await this.userEntityService.create(user);

    return {
      id: user.id,
      username: user.username,
      role: mapUserRoleToDtoUserRole(user.role),
    };
  }

  /**
   * @todo check user role in DB?
   * @param userId
   * @param dto
   */
  async editUser(userId: string, dto: UserEditDto): Promise<UserEditedDto> {
    const user = await this.userEntityService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = dto.username;
    user.password = await this.authService.hashPassword(dto.password);
    user.role = mapDtoUserRoleToUserRole(dto.role);

    await this.userEntityService.create(user);

    return {
      id: user.id,
      username: user.username,
      role: mapUserRoleToDtoUserRole(user.role),
    };
  }

  async getUserList(): Promise<UserListDto> {
    const userList = await this.userEntityService.getList();
    const items = userList.items.map(mapUserEntityToUserListItem);

    return { items };
  }

  async login(dto: LoginDto): Promise<LoggedInDto> {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );

    const token = this.authService.createToken(user);

    return { access_token: token };
  }
}
