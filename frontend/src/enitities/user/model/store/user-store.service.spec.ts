import { TestBed } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';

describe(UserStoreService.name, () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
