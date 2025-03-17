import { Injectable } from '@angular/core';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserEditDto } from '@shared/user-edit.dto';
import { map, Observable } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { mapDtoToUserList } from './map-dto-to-user-list';
import { mapUserRoleToDtoUserRole } from './map-user-role-to-dto-user-role';
import { UserCreateModel } from './user-create.model';
import { UserList } from './user-list';
import { UserUpdateModel } from './user-update.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private readonly userApiService: UserApiService) {
  }

  createUser(user: UserCreateModel): Observable<void> {
    const dto: UserCreateDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.createUser(dto);
  }

  editUser(user: UserUpdateModel): Observable<void> {
    const dto: UserEditDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.editUser(user.id, dto);
  }

  getUserList(): Observable<UserList> {
    return this.userApiService.getUserList()
      .pipe(map(mapDtoToUserList));
  }
}
