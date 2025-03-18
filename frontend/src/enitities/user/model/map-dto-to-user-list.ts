import { UserListDto } from '@shared/user-list.dto';
import { mapDtoUserRoleToUserRole } from './map-dto-user-role-to-user-role';
import { UserList } from './user-list';

export function mapDtoToUserList(dto: UserListDto): UserList {
  const items = dto.items.map(itemDto => ({
    id: itemDto.id,
    username: itemDto.username,
    role: mapDtoUserRoleToUserRole(itemDto.role),
  }));

  return { items };
}
