import { Directive } from '@angular/core';

@Directive({
  selector: '[playerStopPropagation]',
  host: {
    '(click)': '$event.stopPropagation()',
    '(mousedown)': '$event.stopPropagation()',
  },
})
export class StopPropagation {}
