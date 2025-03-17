import { ChangeDetectionStrategy, Component, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { UserRole } from '../enitities/user/model/user-role';
import { AppService } from './app.service';
import { AppVo } from './app.vo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarModule, ButtonModule, Dialog, InputTextModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly vo: Signal<AppVo | undefined>;
  protected readonly isDialogOpen = signal<boolean>(false);

  protected readonly formGroup = new FormGroup({
    // todo Add validation to check if the username already exists.
    username: new FormControl<string>('', { validators: [Validators.required] }),
    // todo Add validation to check password strength.
    password: new FormControl<string>('', { validators: [Validators.required] }),
    role: new FormControl<UserRole>(UserRole.REGULAR,  { validators: [Validators.required] }),
  });

  constructor(private readonly appService: AppService) {
    this.vo = toSignal(this.appService.getVo());
  }

  protected onCreateClick(): void {
    this.isDialogOpen.set(true);
  }

  protected onCancelClick(): void {
    this.isDialogOpen.set(false);
  }

  protected onLogoutClick(): void {
    this.appService.logout();
  }

  protected onSaveClick(): void {
    const value = this.formGroup.value as { username: string, password: string, role: UserRole };

    console.log(value);
  }
}
