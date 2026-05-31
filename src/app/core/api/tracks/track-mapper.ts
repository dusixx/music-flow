import { Track } from '@app/shared/models/track';
import { TrackDto } from './track-dto';

export class TrackMapper {
  static mapTrack(dto: TrackDto): Track {
    return {
      id: dto.id,
      name: dto.name,
      artist: {
        id: dto.artist_id,
        name: dto.artist_name,
      },
      album: {
        id: dto.album_id,
        image: dto.album_image,
      },
      releaseDate: dto.releasedate,
      image: dto.image,
      duration: dto.duration,
      plays: dto.stats.rate_listened_total,
      audio: dto.audio,
      download: dto.audiodownload,
      downloadAllowed: dto.audiodownload_allowed,
    };
  }

  static mapTracks(dto: TrackDto[]): Track[] {
    return dto.map(this.mapTrack);
  }
}
