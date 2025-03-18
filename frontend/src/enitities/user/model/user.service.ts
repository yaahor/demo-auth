import { Injectable } from '@angular/core';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserEditDto } from '@shared/user-edit.dto';
import { map, Observable } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { mapDtoToUserList } from './map-dto-to-user-list';
import { mapDtoUserRoleToUserRole } from './map-dto-user-role-to-user-role';
import { mapUserRoleToDtoUserRole } from './map-user-role-to-dto-user-role';
import { User } from './user';
import { UserCreateModel } from './user-create.model';
import { UserList } from './user-list';
import { UserUpdateModel } from './user-update.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private readonly userApiService: UserApiService) {
  }

  createUser(user: UserCreateModel): Observable<User> {
    const dto: UserCreateDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.createUser(dto)
      .pipe(map((dto) => {
        return {
          id: dto.id,
          username: dto.username,
          role: mapDtoUserRoleToUserRole(dto.role),
        }
      }));
  }

  editUser(user: UserUpdateModel): Observable<User> {
    const dto: UserEditDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.editUser(user.id, dto).pipe(map((dto) => {
      return {
        id: dto.id,
        username: dto.username,
        role: mapDtoUserRoleToUserRole(dto.role),
      }
    }));
  }

  getUserList(): Observable<UserList> {
    return this.userApiService.getUserList()
      .pipe(map(mapDtoToUserList));
  }
}
