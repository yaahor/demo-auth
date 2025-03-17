import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { UserService } from '../../enitities/user/model/user.service';
import { UserListVo } from './user-list.vo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private readonly userService: UserService) {
  }

  getUserList(): Observable<UserListVo> {
    return this.userService.getUserList()
      .pipe(
        map((userList): UserListVo => {
          return { status: 'success', items: userList.items };
        }),
        catchError(() => of<UserListVo>({ status: 'error' })),
        startWith<UserListVo>({ status: 'loading' }),
      );
  }
}
