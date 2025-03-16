import { UserListDto } from '@shared/user-list.dto';
import { UserListVo } from './user-list.vo';

export function mapDtoToUserListSuccessVo(dto: UserListDto): UserListVo {
  return {
    status: 'success',
    items: dto.items.map((itemDto) => ({ id: itemDto.id, username: itemDto.username, role: itemDto.role }))
  };
}
