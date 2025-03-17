import { DtoUserRole } from './dto-user-role';

export interface UserListDto {
  items: UserListItemDto[];
}

export interface UserListItemDto {
  id: string;
  username: string;
  role: DtoUserRole;
}
