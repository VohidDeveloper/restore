import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-auth-cover',
  standalone: true,
  imports: [],
  templateUrl: './auth-cover.component.html',
  styleUrl: './auth-cover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCoverComponent {
  closeDialog = output<void>();
}
