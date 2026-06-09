import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../firestore/firestore-service';
import { PlaylistPayload } from '@app/shared/models/firestore.model';

@Injectable()
export class PlaylistApiService {
  private firestoreService = inject(FirestoreService);

  createPlaylist(payload: PlaylistPayload) {
    const { playlistId, name, description, uid, trackIds } = payload;
    return this.firestoreService.setData('playlists', playlistId, {
      id: playlistId,
      name,
      description,
      trackIds,
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
