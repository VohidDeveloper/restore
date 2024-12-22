import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { PricesComponent } from 'src/app/shared/components/prices/prices.component';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from 'src/app/core/services/api.service';
import { map, switchMap } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { historyInit } from 'shared/constants';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HistoryTableComponent, PricesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  isHistoryTab = signal(true);
  pageHistoryTable = signal(1);

  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly activatedRoute = inject(ActivatedRoute);

  historyData = toSignal(
    toObservable(this.pageHistoryTable).pipe(
      switchMap((page) => {
        return this.apiService
          .getHistory(this.storage.get('id') as string, page)
          .pipe(map((res) => res.data));
      }),
    ),
    { initialValue: historyInit },
  );

  history = computed(() => this.historyData().data);
  lengthHistoryTable = computed(() => this.historyData().total);
  lastPage = computed(() => this.historyData().last_page);

  ngOnInit(): void {
    const isHistoryTab =
      this.activatedRoute.snapshot.queryParamMap.get('isHistoryTab');
    if (isHistoryTab && isHistoryTab === 'false') {
      this.isHistoryTab.set(false);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
