import { DtoUserRole } from '@shared/dto-user-role';
import { UserRole } from './user-role';

export function mapDtoUserRoleToUserRole(role: DtoUserRole): UserRole {
  switch (role) {
    case DtoUserRole.ADMIN:
      return UserRole.ADMIN;
    case DtoUserRole.REGULAR:
      return UserRole.REGULAR;
  }
}
