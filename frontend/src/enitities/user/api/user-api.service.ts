import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserListDto } from '@shared/user-list.dto';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private readonly httpClient: HttpClient) {
  }

  createUser(dto: UserCreateDto): Observable<void> {
    return this.httpClient.post(apiUrl, dto).pipe(map(() => void 0));
  }

  editUser(userId: string, dto: UserCreateDto): Observable<void> {
    return this.httpClient.put(`${apiUrl}/${userId}`, dto).pipe(map(() => void 0));
  }

  getUserList(): Observable<UserListDto> {
    return this.httpClient.get<UserListDto>(apiUrl);
  }
}
