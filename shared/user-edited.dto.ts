import { DtoUserRole } from './dto-user-role';

export interface UserEditedDto {
  id: string;
  username: string;
  role: DtoUserRole;
}
