import { UserRole } from './user-role';

export interface UserListItem {
  id: string;
  username: string;
  role: UserRole;
}
