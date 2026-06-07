import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  displayName: string;
  birthday: string;
  createdAt: Timestamp;
}

export interface Playlist {
  id?: string;
  name: string;
  description?: string;
  trackIds: string[];
  uid: string;
}

export interface CollectionRegistry {
  users: UserProfile;
  playlists: Playlist;
}
