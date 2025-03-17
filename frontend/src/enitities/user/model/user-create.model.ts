import { UserRole } from './user-role';

export interface UserCreateModel {
  username: string;
  password: string;
  role: UserRole;
}
