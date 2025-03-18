import { DtoUserRole } from '@shared/dto-user-role';

export interface JwtPayload {
  id: string;
  username: string;
  role: DtoUserRole;
}
