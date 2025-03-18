import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUserList = createSelector(selectUserState, state => state.userList);
