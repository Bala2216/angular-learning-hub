export interface Employee {
  id: number;
  name: string;
  city: string;
  email: string;
  avatar: string;
  address?: {
    city: string;
  };
}

export interface Profile {
  id: number;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// search api models
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Photo {
  id: number;
  title: string;
  thumbnailUrl?: string;
}

export interface CombinedCard {
  name: string;
  email: string;
  username?: string;
  title?: string;
  photoUrl?: string;
}
