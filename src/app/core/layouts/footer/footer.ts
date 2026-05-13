import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';

interface FooterLink {
  name: string;
  url: string;
}

@Component({
  selector: 'player-footer',
  imports: [MatNavList, MatListItem],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  footerLinks: FooterLink[] = [
    { name: 'RS School', url: 'https://rs.school/' },
    { name: 'Ina', url: 'https://github.com/inalitvinka/' },
    { name: 'Andrew', url: 'https://github.com/dusixx/' },
    { name: 'Aleksey', url: 'https://github.com/nginit/' },
  ];
}
