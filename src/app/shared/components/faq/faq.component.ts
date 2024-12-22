import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  rotateAnimation,
  expandCollapseAnimation,
} from '../../animations/faq-animation';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from 'src/app/core/services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [expandCollapseAnimation, rotateAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  private readonly apiService = inject(ApiService);

  status = signal(new Map<number, boolean>());

  faqs = toSignal(this.apiService.getFaq().pipe(map((res) => res.data)));

  toggleFaq(index: number): void {
    const status = this.status();
    const item = status.get(index);

    if (item) {
      status.set(index, false);
    } else {
      status.set(index, true);
    }
    this.status.set(status);
  }
}
