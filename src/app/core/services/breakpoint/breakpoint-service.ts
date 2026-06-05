import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Breakpoint } from '@app/shared/constants';

type ScreenWidth = Exclude<Lowercase<keyof typeof Breakpoint>, 'wide'>;

const MediaQuery = {
  Mobile: `(width <= ${Breakpoint.Mobile}px)`,
  Tablet: `(width > ${Breakpoint.Mobile}px) and (width <= ${Breakpoint.Tablet}px)`,
  Desktop: `(width > ${Breakpoint.Tablet}px)`,
  CanHover: '(hover: hover) and (pointer: fine)',
};

// TODO: rename to ViewportService

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private destroyRef = inject(DestroyRef);

  private _screenWidth = signal<ScreenWidth>('desktop');
  screenWidth = this._screenWidth.asReadonly();

  private _canHover = signal(false);
  canHover = this._canHover.asReadonly();

  private query = {
    mobile: matchMedia(MediaQuery.Mobile),
    tablet: matchMedia(MediaQuery.Tablet),
    desktop: matchMedia(MediaQuery.Desktop),
    canHover: matchMedia(MediaQuery.CanHover),
  };

  constructor() {
    this.initMediaQueryListeners();
    this.handleMatchMediaChange();
  }

  private initMediaQueryListeners() {
    Object.values(this.query).forEach((q) =>
      q.addEventListener('change', this.handleMatchMediaChange)
    );
    this.destroyRef.onDestroy(() => {
      Object.values(this.query).forEach((q) =>
        q.removeEventListener('change', this.handleMatchMediaChange)
      );
    });
  }

  private handleMatchMediaChange = () => {
    this._canHover.set(this.query.canHover.matches);

    if (this.query.mobile.matches) {
      this._screenWidth.set('mobile');
    } else if (this.query.tablet.matches) {
      this._screenWidth.set('tablet');
    } else if (this.query.desktop.matches) {
      this._screenWidth.set('desktop');
    }
  };
}
