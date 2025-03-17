import { DtoUserRole } from '@shared/dto-user-role';
import { UserRole } from './user-role';

export function mapUserRoleToDtoUserRole(role: UserRole): DtoUserRole {
  switch (role) {
    case UserRole.ADMIN:
      return DtoUserRole.ADMIN;
    case UserRole.REGULAR:
      return DtoUserRole.REGULAR;
  }
}
