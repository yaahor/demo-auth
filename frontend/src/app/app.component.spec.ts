import { TestBed } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe(AppComponent.name, () => {
  const appServiceSpy = jasmine.createSpyObj('AppService', ['getVo']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: AppService,
          useValue: appServiceSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    appServiceSpy.getVo.and.returnValue(NEVER);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
