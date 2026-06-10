import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  displayName: string;
  createdAt: Timestamp;
  birthday?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackIds: string[];
  uid: string;
}

export interface CollectionRegistry {
  users: UserProfile;
  playlists: Playlist;
}

export type RegisterInput = {
  email: string;
  password: string;
} & Omit<UserProfile, 'createdAt' | 'id'>;

export type CollectionName = keyof CollectionRegistry;

export type CreatePlaylistInput = Omit<Playlist, 'id'>;

export type UpdatePlaylistInput = Partial<Omit<Playlist, 'id'>>;
