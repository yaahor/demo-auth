import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../enitities/user/model/user-role';
import { AppVo } from './app.vo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly authService: AuthService) {
  }

  getVo(): Observable<AppVo> {
    const roles = [UserRole.ADMIN, UserRole.REGULAR];

    return this.authService.observeLoggedIn()
      .pipe(
        map((isLoggedIn) => {
          return { isLoggedIn, roles };
        }));
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.clearToken();
  }
}
