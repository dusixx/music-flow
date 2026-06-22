import { Pipe, PipeTransform } from '@angular/core';

const SECS_PER_HOUR = 3600;
const SECS_PER_MIN = 60;

@Pipe({
  name: 'durationText',
})
export class DurationTextPipe implements PipeTransform {
  transform(secs: string | number) {
    const num = Math.floor(Number(secs));
    if (!num) {
      return '';
    }
    const hours = Math.floor(num / SECS_PER_HOUR);
    const minutes = Math.floor((num - hours * SECS_PER_HOUR) / SECS_PER_MIN);
    const seconds = num % SECS_PER_MIN;
    const result: string[] = [];
    if (hours > 0) result.push(`${hours} hr`);
    if (minutes > 0 || hours > 0) result.push(`${minutes} min`);
    if (seconds > 0 && hours === 0) result.push(`${seconds} sec`);
    return result.join(' ');
  }
}
