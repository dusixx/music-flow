import { TeamMember } from './about.models';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Ina',
    role: 'Front-End Developer',
    bio: 'Works on UI components and Angular architecture. Handles data flow and component communication.',
    photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    github: 'https://github.com/inalitvinka',
    favoriteTracks: [
      {
        id: 'track-1',
        title: 'Lorem ipsum dolor',
        artist: 'Sit amet',
      },
      {
        id: 'track-2',
        title: 'Consectetur adipiscing',
        artist: 'Elit sed',
      },
      {
        id: 'track-3',
        title: 'Tempor incididunt',
        artist: 'Ut labore',
      },
    ],
  },
  {
    name: 'Andrew',
    role: 'Team Lead | Front-End Developer',
    bio: 'Works on UI components and Angular architecture. Handles data flow and component communication.',
    photo:
      'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fG11c2ljfGVufDB8fDB8fHww',
    github: 'https://github.com/dusixx',
    favoriteTracks: [
      {
        id: 'track-1',
        title: 'Lorem ipsum dolor',
        artist: 'Sit amet',
      },
      {
        id: 'track-2',
        title: 'Consectetur adipiscing',
        artist: 'Elit sed',
      },
      {
        id: 'track-3',
        title: 'Tempor incididunt',
        artist: 'Ut labore',
      },
    ],
  },
  {
    name: 'Aliaksei',
    role: 'Mentor',
    bio: 'Works on UI components and Angular architecture. Handles data flow and component communication.',
    photo:
      'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    github: 'https://github.com/aliaksei-sl',
    favoriteTracks: [
      {
        id: 'track-1',
        title: 'Lorem ipsum dolor',
        artist: 'Sit amet',
      },
      {
        id: 'track-2',
        title: 'Consectetur adipiscing',
        artist: 'Elit sed',
      },
      {
        id: 'track-3',
        title: 'Tempor incididunt',
        artist: 'Ut labore',
      },
    ],
  },
] as const;
