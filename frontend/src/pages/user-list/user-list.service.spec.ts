import { TestBed } from '@angular/core/testing';
import { UserService } from '../../enitities/user/model/user.service';
import { AuthService } from '../../features/auth/auth.service';

import { UserListService } from './user-list.service';

describe(UserListService.name, () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login']),
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['']),
        },
      ],
    });
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
