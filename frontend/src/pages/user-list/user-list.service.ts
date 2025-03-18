import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of, startWith } from 'rxjs';
import { UserRole } from '../../enitities/user/model/user-role';
import { UserUpdateModel } from '../../enitities/user/model/user-update.model';
import { UserService } from '../../enitities/user/model/user.service';
import { AuthService } from '../../features/auth/auth.service';
import { UserListVo } from './user-list.vo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }

  getUserList(): Observable<UserListVo> {
    const roles = [UserRole.ADMIN, UserRole.REGULAR];

    return combineLatest([this.userService.getUserList(), this.authService.observeCurrentUser()])
      .pipe(
        map(([userList, currentUser]): UserListVo => {
          return {
            canEditUsers: currentUser?.role === UserRole.ADMIN,
            items: userList?.items,
            roles,
          };
        }),
        catchError(() => of<UserListVo>({ canEditUsers: false, roles })),
      );
  }

  editUser(user: UserUpdateModel): Observable<void> {
    return this.userService.editUser(user).pipe(map(() => void 0));
  }
}
