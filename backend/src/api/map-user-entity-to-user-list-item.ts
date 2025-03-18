import { UserListItemDto } from '@shared/user-list.dto';
import { UserEntity } from '../database/user/user.entity';
import { mapUserRoleToDtoUserRole } from './map-user-role-to-dto-user-role';

export function mapUserEntityToUserListItem(
  userEntity: UserEntity,
): UserListItemDto {
  return {
    id: userEntity.id,
    username: userEntity.username,
    role: mapUserRoleToDtoUserRole(userEntity.role),
  };
}
