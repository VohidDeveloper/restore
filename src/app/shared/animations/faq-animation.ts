import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expandCollapseAnimation = trigger('expandCollapse', [
  state('collapsed', style({ height: '0', paddingTop: 0 })),
  state('expanded', style({ height: '*', paddingTop: '*' })),
  transition('collapsed <=> expanded', animate('600ms ease-in-out')),
]);

export const rotateAnimation = trigger('rotate', [
  state(
    'initial',
    style({
      transform: 'rotate(0deg)',
    }),
  ),
  state(
    'rotated',
    style({
      transform: 'rotate(45deg)',
    }),
  ),
  transition('initial <=> rotated', animate('600ms ease-in-out')),
]);
