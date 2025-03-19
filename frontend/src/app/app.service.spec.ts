import { TestBed } from '@angular/core/testing';
import { UserService } from '../enitities/user/model/user.service';
import { AuthService } from '../features/auth/auth.service';

import { AppService } from './app.service';

describe(AppService.name, () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['']),
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['']),
        },
      ],
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
