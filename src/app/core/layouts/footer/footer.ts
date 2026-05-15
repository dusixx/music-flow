import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly copyrightText = `© ${new Date().getFullYear()} MusicFlow. All Rights Reserved`;
}
