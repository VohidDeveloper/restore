import { ChangeDetectionStrategy, Component } from '@angular/core';
import { privilegesItems } from 'shared/constants';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivilegesComponent {
  readonly privilegesItems = privilegesItems;
}
