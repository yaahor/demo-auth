import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ access_token: string }>(this.apiUrl, { username, password })
      .pipe(
        tap((res) => {
          this.setToken(res.access_token);
        }),
        map(() => void 0),
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
}
