import { Service, signal } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Track } from '@shared/models/track';

@Service({ autoProvided: false })
export class PlaylistService {
  private tracks = signal<Track[]>([]);
  getTracks = this.tracks.asReadonly();

  add(track: Track) {
    this.tracks.update((t) => [...t, track]);
  }

  remove(track: Track) {
    this.tracks.update((t) => t.filter((item) => item.id !== track.id));
  }

  reorder(from: number, to: number) {
    this.tracks.update((t) => {
      const copy = [...t];
      moveItemInArray(copy, from, to);
      return copy;
    });
  }
}
