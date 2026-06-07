import { Injectable, inject, OnDestroy } from '@angular/core';
import { FirestoreService } from '../firestore/firestore-service';

@Injectable()
export class PlaylistApiService implements OnDestroy {
  private firestoreService = inject(FirestoreService);

  constructor() {
    console.log('PlaylistService created');
  }

  ngOnDestroy() {
    console.log('PlaylistService destroyed');
  }

  createPlaylist(playlistId: string, name: string, description: string, uid: string) {
    return this.firestoreService.setData('playlists', playlistId, {
      name,
      description,
      trackIds: [],
      uid,
    });
  }

  getUserPlaylists(uid: string) {
    return this.firestoreService.getDocsByUid('playlists', uid);
  }

  // UPDATE: name and description
  updatePlaylistDetails(playlistId: string, name: string, description: string) {
    return this.firestoreService.updateData('playlists', playlistId, {
      name,
      description,
    });
  }

  // UPDATE: track order => changed array after drag & drop
  updateTrackOrder(playlistId: string, newTrackIds: string[]) {
    return this.firestoreService.updateData('playlists', playlistId, {
      trackIds: newTrackIds,
    });
  }

  deletePlaylist(playlistId: string) {
    return this.firestoreService.deleteDoc('playlists', playlistId);
  }
}
