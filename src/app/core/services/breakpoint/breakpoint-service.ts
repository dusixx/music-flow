import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Breakpoint } from '@app/core/constants';

type ScreenWidth = Exclude<Lowercase<keyof typeof Breakpoint>, 'wide'>;

const MediaQuery = {
  Mobile: `(width <= ${Breakpoint.Mobile}px)`,
  Tablet: `(width > ${Breakpoint.Mobile}px) and (width <= ${Breakpoint.Tablet}px)`,
  Desktop: `(width > ${Breakpoint.Tablet}px),`,
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private destroyRef = inject(DestroyRef);

  private _screenWidth = signal<ScreenWidth>('desktop');
  screenWidth = this._screenWidth.asReadonly();

  private breakpoint = {
    mobile: matchMedia(MediaQuery.Mobile),
    tablet: matchMedia(MediaQuery.Tablet),
    desktop: matchMedia(MediaQuery.Desktop),
  };

  constructor() {
    Object.values(this.breakpoint).forEach((bp) =>
      bp.addEventListener('change', this.handleMatchMediaChange)
    );
    this.destroyRef.onDestroy(() => {
      Object.values(this.breakpoint).forEach((bp) =>
        bp.removeEventListener('change', this.handleMatchMediaChange)
      );
    });
    this.handleMatchMediaChange();
  }

  private handleMatchMediaChange = () => {
    if (this.breakpoint.mobile.matches) {
      this._screenWidth.set('mobile');
    } else if (this.breakpoint.tablet.matches) {
      this._screenWidth.set('tablet');
    } else if (this.breakpoint.desktop.matches) {
      this._screenWidth.set('desktop');
    }
  };
}
