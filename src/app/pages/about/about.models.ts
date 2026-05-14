export interface FavTrack {
  id: string;
  title: string;
  artist?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  github: string;
  favtracks: FavTrack[];
}
