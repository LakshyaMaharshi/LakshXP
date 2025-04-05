export interface Game {
  id: number;
  name: string;
  background_image: string;
  description: string;
  released: string;
  rating: number;
  genres: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
}

export interface GameState {
  games: Game[];
  favorites: Game[];
  loading: boolean;
  error: string | null;
}