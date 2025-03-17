import { UserListDto } from '@shared/user-list.dto';

export function mapDtoToUserList(dto: UserListDto): UserListDto {
  const items = dto.items.map(itemDto => ({
    id: itemDto.id,
    username: itemDto.username,
    role: itemDto.role,
  }));

  return { items };
}
