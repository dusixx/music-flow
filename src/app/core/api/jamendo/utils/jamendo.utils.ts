import { JamendoResponse, JamendoResult } from '../jamendo.types';
import { JamendoError } from './jamendo-error';

const handleJamendoResponse = <TRawItem, TMappedItem>(
  resp: JamendoResponse<TRawItem>,
  mapper: (raw: TRawItem) => TMappedItem
): JamendoResult<TMappedItem> => {
  const { error_message, code, next } = resp.headers;

  if (code) {
    // TODO: remove error message prefix
    throw new JamendoError(error_message, code);
  }
  return {
    hasMore: !!next,
    results: resp.results.map(mapper),
  };
};

export const createJamendoResponseMapper = <TRawItem, TMappedItem>(
  mapper: (v: TRawItem) => TMappedItem
) => {
  return (resp: JamendoResponse<TRawItem>) => handleJamendoResponse(resp, mapper);
};
