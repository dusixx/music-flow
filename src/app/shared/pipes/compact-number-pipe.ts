import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compactNumber',
})
export class CompactNumberPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = Number(value);
    if (Number.isNaN(value)) {
      return '';
    }
    const formatter = Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    return formatter.format(num);
  }
}
