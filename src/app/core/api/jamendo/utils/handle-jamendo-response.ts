import { JamendoResponse, JamendoResult } from '../jamendo.types';
import { JamendoError } from './jamendo-error';

const handleJamendoResponse = <TRawItem, TMappedItem>(
  resp: JamendoResponse<TRawItem>,
  mapper: (raw: TRawItem) => TMappedItem
): JamendoResult<TMappedItem> => {
  const { error_message, code, next, results_fullcount } = resp.headers;

  if (code) {
    // TODO: remove error message prefix
    throw new JamendoError(error_message, code);
  }
  return {
    hasMore: !!next,
    total: results_fullcount,
    results: resp.results.map(mapper),
  };
};

export const createJamendoResponseHandler = <TRawItem, TMappedItem>(
  mapper: (v: TRawItem) => TMappedItem
) => {
  return (resp: JamendoResponse<TRawItem>) => handleJamendoResponse(resp, mapper);
};
