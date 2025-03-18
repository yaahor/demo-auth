import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserCreateModel } from '../enitities/user/model/user-create.model';
import { UserRole } from '../enitities/user/model/user-role';
import { UserService } from '../enitities/user/model/user.service';
import { AuthService } from '../features/auth/auth.service';
import { AppVo } from './app.vo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  getVo(): Observable<AppVo> {
    const roles = [UserRole.ADMIN, UserRole.REGULAR];

    return this.authService.observeLoggedIn()
      .pipe(
        map((isLoggedIn) => {
          return { isLoggedIn, roles };
        }));
  }

  logout(): void {
    this.authService.clearToken();
  }

  createUser(user: UserCreateModel): Observable<void> {
    return this.userService.createUser(user);
  }
}
