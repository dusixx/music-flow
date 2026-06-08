import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  displayName: string;
  createdAt: Timestamp;
  birthday?: string;
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

export type RegisterPayload = {
  email: string;
  password: string;
} & Omit<UserProfile, 'createdAt'>;

export type PlaylistPayload = { playlistId: string } & Playlist;
