import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-login'
  },
})
export class LoginComponent {
  protected readonly formGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  protected onButtonClick(): void {
    this.authService.login(this.formGroup.value.username, this.formGroup.value.password)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.router.navigate(['/']).then();
      })
  }
}
