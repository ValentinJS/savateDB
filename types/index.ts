export interface IToken {
  access_token: string;
  expires_in: number;
  token_type: 'bearer';
}

export enum GameStatus {
  'released' = 0,
  'alpha' = 2,
  'beta' = 3,
  'early_access' = 4,
  'offline' = 5,
  'cancelled' = 6,
  'rumored' = 7,
  'delisted' = 8,
}

export enum GameCategory {
  'main_game' = 0,
  'dlc_addon',
  'expansion',
  'bundle',
  'standalone_expansion',
  'mod',
  'episode',
  'season',
  'remake',
  'remaster',
  'expanded_game',
  'port',
  'fork',
}

export interface IGame {
  id: number;
  checksum: string;
  age_ratings: number[];
  aggregrated_rating: number;
  aggregrated_rating_count: number;
  alternative_names: number[];
  artworks: number[];
  bundles: number[];
  category: GameCategory;
  collection: number;
  cover: number;
  created_at: number;
  dlcs: number[];
  expanded_games: number[];
  expansions: number[];
  external_games: number[];
  first_release_date: number;
  follows: number;
  forks: number[];
  franchise: number;
  franchises: number[];
  game_engines: number[];
  game_modes: number[];
  genres: number[];
  hypes: number;
  involved_companies: number[];
  keywords: number[];
  multiplayer_modes: number[];
  name: string;
  parent_game: string;
  platforms: number[];
  player_perspectives: number[];
  ports: number[];
  rating: number;
  rating_count: number;
  release_dates: number[];
  remakes: number[];
  remasters: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  standalone_expansions: number[];
  status: GameStatus;
  storyline: string;
  summary: string;
  tags: number[];
  themes: number[];
  total_rating: number;
  total_rating_count: number;
  updated_at: number;
  url: string;
  version_parent: number;
  version_title: string;
  videos: number[];
  websites: number[];
}

export interface ICover {
  id: number;
  checksum: string;
  alpha_channel: boolean;
  animated: boolean;
  height: number;
  image_id: string;
  url: string;
  width: string;
  game: number;
}
