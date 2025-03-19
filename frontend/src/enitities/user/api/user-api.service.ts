import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from '@shared/user-create.dto';
import { UserCreatedDto } from '@shared/user-created.dto';
import { UserEditedDto } from '@shared/user-edited.dto';
import { UserListDto } from '@shared/user-list.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private readonly httpClient: HttpClient) {}

  createUser(dto: UserCreateDto): Observable<UserCreatedDto> {
    return this.httpClient.post<UserCreatedDto>(apiUrl, dto);
  }

  editUser(userId: string, dto: UserCreateDto): Observable<UserEditedDto> {
    return this.httpClient.put<UserEditedDto>(`${apiUrl}/${userId}`, dto);
  }

  getUserList(): Observable<UserListDto> {
    return this.httpClient.get<UserListDto>(apiUrl);
  }
}
