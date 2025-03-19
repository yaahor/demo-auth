import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { UserApiService } from '../api/user-api.service';
import { UserService } from './user.service';

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserApiService,
          useValue: jasmine.createSpyObj('UserApiService', ['']),
        },
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['']),
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
