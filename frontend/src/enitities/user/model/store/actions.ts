import { createAction, props } from '@ngrx/store';
import { User } from '../user';
import { UserList } from '../user-list';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ userList: UserList }>());

export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());

export const editUserSuccess = createAction('[User] Edit User Success', props<{ user: User }>());
