import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { UserRole } from '../../enitities/user/model/user-role';
import { UserUpdateModel } from '../../enitities/user/model/user-update.model';
import { UserService } from '../../enitities/user/model/user.service';
import { UserListVo } from './user-list.vo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private readonly userService: UserService) {
  }

  getUserList(): Observable<UserListVo> {
    const roles = [UserRole.ADMIN, UserRole.REGULAR];

    return this.userService.getUserList()
      .pipe(
        map((userList): UserListVo => {
          return { items: userList.items, roles };
        }),
        catchError(() => of<UserListVo>({ roles })),
      );
  }

  editUser(user: UserUpdateModel): Observable<void> {
    return this.userService.editUser(user);
  }
}
