import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserListService } from './user-list.service';
import { UserListVo } from './user-list.vo';

@Component({
  selector: 'app-user-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  protected readonly vo: Signal<UserListVo | undefined>;

  constructor(private readonly userListService: UserListService) {
    this.vo = toSignal(this.userListService.getUserList());
  }
}
