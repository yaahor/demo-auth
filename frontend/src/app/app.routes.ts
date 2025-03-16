import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { LoginComponent } from '../login/login.component';
import { UserListComponent } from '../user-list/user-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
