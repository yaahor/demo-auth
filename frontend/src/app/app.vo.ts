import { UserRole } from '../enitities/user/model/user-role';

export interface AppVo {
  isLoggedIn: boolean;
  roles: UserRole[];
}
