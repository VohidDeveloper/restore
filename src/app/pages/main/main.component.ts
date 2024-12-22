import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ImageCompareComponent } from './components/image-compare/image-compare.component';
import { aboutItems, benefitsItems, howItems } from 'shared/constants';
import { PrivilegesComponent } from 'src/app/shared/components/privileges/privileges.component';
import { FaqComponent } from 'src/app/shared/components/faq/faq.component';
import { PricesComponent } from '../../shared/components/prices/prices.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ImageCompareComponent,
    PrivilegesComponent,
    FaqComponent,
    PricesComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly howItems = howItems;
  readonly aboutItems = aboutItems;
  readonly benefitsItems = benefitsItems;

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
