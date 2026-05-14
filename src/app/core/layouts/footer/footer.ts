import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly copyrightYear = new Date().getFullYear();
  readonly copyrightText = `© ${this.copyrightYear} MusicFlow. All Rights Reserved`;
}
