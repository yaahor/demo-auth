import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  REGULAR = 'regular',
  ADMIN = 'admin',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR })
  role: UserRole;
}
