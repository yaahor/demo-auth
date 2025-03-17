import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { UserListDto } from '@shared/user-list.dto';
import { environment } from '../../environments/environment';
import { mapDtoToUserListSuccessVo } from './map-dto-to-user-list-success-vo';
import { UserListVo } from './user-list.vo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getUserList(): Observable<UserListVo> {
    return this.httpClient.get<UserListDto>(`${environment.apiUrl}/users`)
      .pipe(
        map(mapDtoToUserListSuccessVo),
        catchError(() => of<UserListVo>({ status: 'error' })),
        startWith<UserListVo>({ status: 'loading' }),
      );
  }
}
