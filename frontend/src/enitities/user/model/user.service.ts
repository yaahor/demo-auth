import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserEditDto } from '@shared/user-edit.dto';
import { map, Observable, tap } from 'rxjs';
import { UserApiService } from '../api/user-api.service';
import { mapDtoUserRoleToUserRole } from './map-dto-user-role-to-user-role';
import { mapUserRoleToDtoUserRole } from './map-user-role-to-dto-user-role';
import { addUserSuccess, editUserSuccess, loadUsers } from './store/actions';
import { selectUserList } from './store/selectors';
import { User } from './user';
import { UserCreateModel } from './user-create.model';
import { UserList } from './user-list';
import { UserUpdateModel } from './user-update.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly userApiService: UserApiService,
    private readonly store: Store,
  ) {
  }

  createUser(user: UserCreateModel): Observable<User> {
    const dto: UserCreateDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.createUser(dto)
      .pipe(
        map((dto) => {
          return {
            id: dto.id,
            username: dto.username,
            role: mapDtoUserRoleToUserRole(dto.role),
          };
        }),
        tap((createdUser) => this.store.dispatch(addUserSuccess({ user: createdUser }))),
      );
  }

  editUser(user: UserUpdateModel): Observable<User> {
    const dto: UserEditDto = {
      username: user.username,
      password: user.password,
      role: mapUserRoleToDtoUserRole(user.role),
    };

    return this.userApiService.editUser(user.id, dto).pipe(
      map((dto): User => {
        return {
          id: dto.id,
          username: dto.username,
          role: mapDtoUserRoleToUserRole(dto.role),
        };
      }),
      tap((editedUser) => this.store.dispatch(editUserSuccess({ user: editedUser }))),
    );
  }

  getUserList(): Observable<UserList> {
    this.store.dispatch(loadUsers());

    return this.store.select(selectUserList);
  }
}
