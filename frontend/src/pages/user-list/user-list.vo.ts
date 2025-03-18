import { UserListItem } from '../../enitities/user/model/user-list-item';
import { UserRole } from '../../enitities/user/model/user-role';

export interface UserListVo {
  canEditUsers: boolean;
  items?: UserListItem[];
  roles: UserRole[];
}
