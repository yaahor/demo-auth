import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { UserCreateModel } from '../../enitities/user/model/user-create.model';
import { UserListItem } from '../../enitities/user/model/user-list-item';
import { UserRole } from '../../enitities/user/model/user-role';
import { UserUpdateModel } from '../../enitities/user/model/user-update.model';
import { UserListService } from './user-list.service';
import { UserListVo } from './user-list.vo';

@Component({
  selector: 'app-user-list',
  imports: [TableModule, ButtonModule, Dialog, InputTextModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  protected readonly vo: Signal<UserListVo | undefined>;
  protected readonly isDialogOpen = signal<boolean>(false);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly formGroup = new FormGroup({
    id: new FormControl<string>('', { validators: [Validators.required] }),
    // todo Add validation to check if the username already exists.
    username: new FormControl<string>('', { validators: [Validators.required] }),
    // todo Add validation to check password strength.
    password: new FormControl<string>('', { validators: [Validators.required] }),
    role: new FormControl<UserRole>(UserRole.REGULAR,  { validators: [Validators.required] }),
  });

  constructor(private readonly userListService: UserListService) {
    this.vo = toSignal(this.userListService.getUserList());
  }

  protected onCancelClick(): void {
    this.isDialogOpen.set(false);
  }

  protected onEditClick(user: UserListItem): void {
    this.formGroup.reset(user);
    this.isDialogOpen.set(true);
  }

  protected onSaveClick(): void {
    const user = this.formGroup.value as UserUpdateModel;

    // todo show spinner
    // todo show error
    this.userListService.editUser(user)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      ).
    subscribe(() => { this.isDialogOpen.set(false); });
  }
}
