import { DtoUserRole } from '@shared/dto-user-role';
import { UserRole } from '../database/user/user.entity';

export function mapDtoUserRoleToUserRole(dtoRole: DtoUserRole): UserRole {
  switch (dtoRole) {
    case DtoUserRole.ADMIN:
      return UserRole.ADMIN;
    case DtoUserRole.REGULAR:
      return UserRole.REGULAR;
  }
}
