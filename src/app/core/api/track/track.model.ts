import { EntityWithId } from '@app/shared/models/types/common.types';

export interface Track extends EntityWithId {
  id: string;
  name: string;
  artist: {
    id: string;
    name: string;
  };
  album: {
    id: string;
    image: string;
    name: string;
  };
  releaseDate: string;
  image: string;
  duration: number;
  plays: number;
  audio: string;
  download: string;
  downloadAllowed: boolean;
  isFavorite?: boolean;
}
