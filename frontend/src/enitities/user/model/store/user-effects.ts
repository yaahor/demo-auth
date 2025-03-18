import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { UserApiService } from '../../api/user-api.service';
import { mapDtoToUserList } from '../map-dto-to-user-list';
import { loadUsers, loadUsersSuccess } from './actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userApiService = inject(UserApiService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userApiService.getUserList().pipe(
          map(mapDtoToUserList),
          map(userList => loadUsersSuccess({ userList })),
          // todo handle error
        ),
      ),
    ),
  );
}
