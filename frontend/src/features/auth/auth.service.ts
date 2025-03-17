import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login`;
  private statusChange = new Subject<void>();

  private isLoggedIn$ = this.statusChange
    .pipe(
      map(() => this.isLoggedIn()),
      startWith(this.isLoggedIn())
    );

  constructor(private http: HttpClient, private readonly router: Router) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ access_token: string }>(this.apiUrl, { username, password })
      .pipe(
        tap((res) => {
          this.setToken(res.access_token);
        }),
        map(() => void 0),
      );
  }

  clearToken() {
    localStorage.removeItem('access_token');
    this.statusChange.next();
    this.router.navigate(['/login']).then();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.statusChange.next();
  }

  observeLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
