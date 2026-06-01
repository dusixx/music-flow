export interface Track {
  id: string;
  name: string;
  artist: {
    id: string;
    name: string;
  };
  album: {
    id: string;
    image: string;
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
