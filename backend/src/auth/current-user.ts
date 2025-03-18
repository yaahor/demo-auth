import { UserRole } from '../database/user/user.entity';

export interface CurrentUser {
  id: string;
  username: string;
  role: UserRole;
}
