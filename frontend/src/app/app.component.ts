import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AppService } from './app.service';
import { AppVo } from './app.vo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly vo: Signal<AppVo | undefined>

  constructor(private readonly appService: AppService) {
    this.vo = toSignal(this.appService.getVo());
  }

  onLogoutClick(): void {
    this.appService.logout();
  }
}
