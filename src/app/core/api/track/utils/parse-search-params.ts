import { JamendoSearchParams } from '../../jamendo/jamendo.types';
import { SearchParams } from '../track-service.types';

export const parseSearchParams = ({
  fuzzytags,
  tags,
  durationFrom,
  durationTo,
  limit,
  offset,
  query,
  sortBy,
  sortOrder = 'asc',
}: SearchParams): JamendoSearchParams => {
  const result: JamendoSearchParams = { limit, offset, search: query.trim() };

  const normalizedTags = tags?.filter(Boolean);
  const normalizedFuzzyTags = fuzzytags?.filter(Boolean);

  if (normalizedTags?.length) {
    result.tags = normalizedTags.join('+');
  } else if (normalizedFuzzyTags?.length) {
    result.fuzzytags = normalizedFuzzyTags.join('+');
  }

  const durFrom = ~~Number(durationFrom);
  const durTo = ~~Number(durationTo);

  if (durTo > 0) {
    result.durationbetween = `${durFrom < durTo ? durFrom : 0}_${durTo}`;
  }

  if (sortBy === 'popularity' && (result.tags || result.fuzzytags)) {
    result.boost = 'popularity_month';
  } else if (sortBy) {
    result.order = `${sortBy}_${sortOrder}`;
  }

  return result;
};
