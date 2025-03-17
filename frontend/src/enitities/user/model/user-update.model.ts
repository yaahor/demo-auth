import { UserRole } from './user-role';

export interface UserUpdateModel {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}
