import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { UserService } from '../user.service';
import { addUser, addUserSuccess, editUser, editUserSuccess, loadUsers, loadUsersSuccess } from './actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUserList().pipe(
          map(userList => loadUsersSuccess({ userList })),
          // todo handle error
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap(action =>
        this.userService.createUser(action.user).pipe(
          map(user => addUserSuccess({ user })),
          // todo handle error
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      mergeMap(action =>
        this.userService.editUser(action.user).pipe(
          map(user => editUserSuccess({ user })),
          // todo handle error
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService, private store: Store) {}
}
