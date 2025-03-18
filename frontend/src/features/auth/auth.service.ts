import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, startWith, Subject, tap } from 'rxjs';
import { User } from '../../enitities/user/model/user';
import { environment } from '../../environments/environment';


/* todo don't store in localstorage for security reasons */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/login`;
  private statusChange = new BehaviorSubject<void>(void 0);

  private isLoggedIn$ = this.statusChange
    .pipe(
      map(() => this.isLoggedIn()),
    );

  private currentUser$ = this.statusChange
    .pipe(
      map(() => this.getCurrentUser()),
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

  getCurrentUser(): User | undefined {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    return jwtDecode<User>(token);
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

  observeCurrentUser(): Observable<User | undefined> {
    return this.currentUser$;
  }
}
