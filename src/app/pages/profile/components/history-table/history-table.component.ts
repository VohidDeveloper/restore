import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HistoryTable } from 'src/app/shared/models';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent {
  readonly displayedColumns: string[] = ['payment', 'coins', 'plan', 'date'];

  page = model.required<number>();
  lastPage = input.required<number>();
  history = input.required<HistoryTable[]>();
  pagesCount = computed(() =>
    Array.from({ length: this.lastPage() }, (_, i) => i + 1),
  );

  handlePageEvent(value: 'prev' | 'next'): void {
    if (value === 'prev' && this.page() !== 1) {
      this.page.update((page) => page - 1);
    } else if (value === 'next' && this.page() !== this.lastPage()) {
      this.page.update((page) => page + 1);
    }
  }
}
