// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  /*
  Animation code from Jason Watmore's tutorial:
  http://jasonwatmore.com/post/2017/04/19/angular-2-4-router-animation-tutorial-example
  */
  trigger('fadeInAnimation', [
    // route 'enter' transition
    transition(':enter', [
      // css styles at start of transition
      style({ opacity: 0 }),
      // animation and styles at end of transition
      animate('.3s ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      // css styles at start of transition
      style({ opacity: 1 }),
      // animation and styles at end of transition
      animate('.3s ease-out', style({ opacity: 0 }))
    ]),
  ]);