import { createAction, props } from '@ngrx/store';
import { User } from '../user';
import { UserCreateModel } from '../user-create.model';
import { UserList } from '../user-list';
import { UserUpdateModel } from '../user-update.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ userList: UserList }>());

export const addUser = createAction('[User] Add User', props<{ user: UserCreateModel }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());

export const editUser = createAction('[User] Edit User', props<{ user: UserUpdateModel }>());
export const editUserSuccess = createAction('[User] Edit User Success', props<{ user: User }>());
