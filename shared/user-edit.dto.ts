import { DtoUserRole } from './dto-user-role';

export interface UserEditDto {
  username: string;
  password: string;
  role: DtoUserRole;
}
