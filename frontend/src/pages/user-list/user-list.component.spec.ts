import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NEVER } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserListService } from './user-list.service';

describe(UserListComponent.name, () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userListServiceSpy: jasmine.SpyObj<UserListService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserListService', ['getUserList']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserListService,
          useValue: spy,
        },
      ],
    }).compileComponents();

    userListServiceSpy = TestBed.inject(
      UserListService,
    ) as jasmine.SpyObj<UserListService>;

    userListServiceSpy.getUserList.and.returnValue(NEVER);

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
