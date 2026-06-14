import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { TuiDialog } from '@taiga-ui/core';

@Component({
  selector: 'player-dialog',
  imports: [TuiDialog],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Dialog {
  isOpen = input.required<boolean>();
  protected title = input('');

  protected closeDialog = output<void>();
}
