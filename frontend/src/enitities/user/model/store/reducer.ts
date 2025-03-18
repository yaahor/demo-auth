import { createReducer, on } from '@ngrx/store';
import { UserList } from '../user-list';
import { addUserSuccess, editUserSuccess, loadUsersSuccess } from './actions';

export interface UserState {
  userList: UserList | undefined;
}

const initialState: UserState = {
  userList: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { userList }) => ({ ...state, userList })),
  on(addUserSuccess, (state, { user }) => {
    const items = state.userList?.items ?? [];
    return { ...state, userList: { items: [...items, user] }};
  }),
  on(editUserSuccess, (state, { user }) => {
    const items = state.userList?.items ?? [];

    return {
      ...state,
      userList: { items: items.map(item => (item.id === user.id ? user : item)) },
    };
  })
);
