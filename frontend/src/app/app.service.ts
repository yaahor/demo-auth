import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppVo } from './app.vo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly authService: AuthService) {
  }

  getVo(): Observable<AppVo> {
    return this.authService.observeLoggedIn()
      .pipe(
        map((isLoggedIn) => {
          return { isLoggedIn };
        }));
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.clearToken();
  }
}
