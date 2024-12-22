import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthService);

  authStatus = toSignal(this.authService.authStatus, {
    initialValue: false,
  });

  openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }

  navigate(): void {
    if (this.authStatus()) {
      this.router.navigate(['generation']);
    } else {
      this.openLoginDialog();
    }
  }
}
