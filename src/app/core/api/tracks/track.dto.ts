export interface TrackDto {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  artist_id: string;
  album_name: string;
  album_id: string;
  album_image: string;
  image: string;
  releasedate: string;
  audio: string;
  audiodownload: string;
  stats: {
    rate_listened_total: number;
  };
  audiodownload_allowed: boolean;
}
