import { Pipe, PipeTransform } from '@angular/core';

const SECS_PER_HOUR = 3600;
const SECS_PER_MIN = 60;

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(secs: string | number) {
    const num = Number(secs);
    if (Number.isNaN(num)) {
      return '';
    }
    const hours = Math.floor(num / SECS_PER_HOUR);
    const minutes = Math.floor((num - hours * SECS_PER_HOUR) / SECS_PER_MIN);
    const seconds = num % SECS_PER_MIN;
    const result = [hours, minutes, seconds];

    return (hours ? result : result.slice(1)).map((v) => `${v}`.padStart(2, '0')).join(':');
  }
}
