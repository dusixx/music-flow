import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../firestore/firestore-service';
import { PlaylistPayload, PlaylistDetailsPayload } from '@app/shared/models/firestore.model';

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

  updatePlaylistDetails(payload: PlaylistDetailsPayload) {
    const { id, ...updates } = payload;
    return this.firestoreService.updateData('playlists', id, updates);
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
