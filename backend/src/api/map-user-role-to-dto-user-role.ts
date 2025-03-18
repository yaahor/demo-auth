import { DtoUserRole } from '@shared/dto-user-role';
import { UserRole } from '../database/user/user.entity';

export function mapUserRoleToDtoUserRole(role: UserRole): DtoUserRole {
  switch (role) {
    case UserRole.ADMIN:
      return DtoUserRole.ADMIN;
    case UserRole.REGULAR:
      return DtoUserRole.REGULAR;
  }
}
