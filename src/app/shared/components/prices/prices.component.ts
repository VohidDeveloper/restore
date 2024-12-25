import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesComponent {
  private readonly dialogService = inject(DialogService);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);

  authStatus = toSignal(this.authService.authStatus, {
    initialValue: false,
  });

  plans = toSignal(this.apiService.getPlans().pipe(map((res) => res.data)), {
    initialValue: [],
  });

  // navigate(id: number): void {
  //   const authStatus = this.authService.authStatus.value;
  //   const userId = this.storage.get('id');

  //   if (authStatus) {
  //     const { url } = this.router;
  //     if (url === '/') {
  //       this.router.navigate(['profile']);
  //     } else {
  //       this.apiService.getPayLink(id, Number(userId));
  //       // .subscribe({
  //       //   next: (res) => {
  //       //     console.log(res);
  //       //   },
  //       //   error: (err) => {
  //       //     console.log(err);
  //       //   },
  //       // });
  //     }
  //     this.router.navigate(['profile'], {
  //       queryParams: { isHistoryTab: false },
  //     });
  //   } else {
  //     this.openLoginDialog();
  //   }
  // }

  private openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }
}
