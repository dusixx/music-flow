import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../firestore/firestore-service';

@Injectable()
export class PlaylistApiService {
  private firestoreService = inject(FirestoreService);

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

  updatePlaylistDetails(playlistId: string, name: string, description: string) {
    return this.firestoreService.updateData('playlists', playlistId, {
      name,
      description,
    });
  }

  updateTrackOrder(playlistId: string, newTrackIds: string[]) {
    return this.firestoreService.updateData('playlists', playlistId, {
      trackIds: newTrackIds,
    });
  }

  deletePlaylist(playlistId: string) {
    return this.firestoreService.deleteDoc('playlists', playlistId);
  }
}
