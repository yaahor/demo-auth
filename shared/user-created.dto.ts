import { DtoUserRole } from './dto-user-role';

export interface UserCreatedDto {
  id: string;
  username: string;
  role: DtoUserRole;
}
