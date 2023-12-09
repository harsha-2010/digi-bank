// app.animations.ts
import { animate, style, transition, trigger } from '@angular/animations';

export const rippleAnimation = trigger('rippleAnimation', [
  transition(':enter', [
    style({ backgroundColor: 'rgba(42, 42, 42, 0.7)' }),
    animate('1s ease-in', style({ backgroundColor: 'rgba(42, 42, 42, 0)' })),
  ]),
]);
