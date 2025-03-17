import { DtoUserRole } from './dto-user-role';

// todo add validation
export class UserEditDto {
  username: string;
  password: string;
  role: DtoUserRole;
}
