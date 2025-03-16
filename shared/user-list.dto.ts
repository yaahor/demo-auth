export interface UserListDto {
  items: UserListItemDto[];
}

export interface UserListItemDto {
  id: string;
  username: string;
  role: DtoUserRole
}

export enum DtoUserRole {
  ADMIN = 'admin',
  REGULAR = 'regular',
}
