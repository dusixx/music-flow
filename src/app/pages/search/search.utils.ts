import { SearchParams } from '@app/core/api/jamendo/jamendo.types';
import { clamp } from '@app/shared/utils/number.utils';

type Duration = SearchParams['durationRange'];

export const clampDuration = (dur: Duration, maxDuration: number): NonNullable<Duration> => {
  const min = clamp(dur?.[0] ?? 0, 0, maxDuration);
  const max = clamp(dur?.[1] ?? maxDuration, 0, maxDuration);

  return min <= max ? [min, max] : [0, maxDuration];
};
