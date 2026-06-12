import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../firestore/firestore-service';
import { CreatePlaylistInput, UpdatePlaylistInput } from '@app/shared/models/firestore.model';

@Injectable()
export class PlaylistApiService {
  private firestoreService = inject(FirestoreService);

  getUserPlaylists(uid: string) {
    return this.firestoreService.getDocsByUid('playlists', uid);
  }

  async createPlaylist(input: CreatePlaylistInput) {
    const id = crypto.randomUUID();
    await this.firestoreService.setData('playlists', id, { ...input, id });
    return id;
  }

  updatePlaylist(playlistId: string, updates: UpdatePlaylistInput) {
    return this.firestoreService.updateData('playlists', playlistId, updates);
  }

  deletePlaylist(playlistId: string) {
    return this.firestoreService.deleteDoc('playlists', playlistId);
  }

  async deleteAllUserPlaylists(uid: string) {
    const playlists = await this.getUserPlaylists(uid);
    const deletePromises = playlists.map((playlist) => this.deletePlaylist(playlist.id));
    await Promise.all(deletePromises);
  }
}
