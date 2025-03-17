// todo add validation
import { DtoUserRole } from './dto-user-role';

export interface UserCreateDto {
  username: string;
  password: string;
  role: DtoUserRole;
}
