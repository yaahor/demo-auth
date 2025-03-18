import { UserRole } from '../enitities/user/model/user-role';

export interface AppVo {
  canLogout: boolean;
  canCreateUsers: boolean;
  roles: UserRole[];
}
