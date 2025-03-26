// Game interface matching the GamePix API structure
export interface Game {
  id: string;
  title: string;
  namespace: string;
  description: string;
  category: string;
  orientation?: string;
  quality_score?: string | number;
  width?: number;
  height?: number;
  date_modified?: string;
  date_published?: string;
  banner_image: string;  // Will use as thumbnailUrl
  image: string;
  url: string;           // Will use as gameUrl
  isHot?: boolean;
  isNew?: boolean;
}

export type Category = 
  | "all"
  | "action"
  | "adventure"
  | "arcade"
  | "battle-royale"
  | "basketball"
  | "block"
  | "board"
  | "casual"
  | "christmas"
  | "drawing"
  | "educational"
  | "fighting"
  | "fun"
  | "halloween"
  | "idle"
  | "kids"
  | "match-3"
  | "memory"
  | "mobile"
  | "monster"
  | "parkour"
  | "puzzle"
  | "racing"
  | "retro"
  | "robots"
  | "runner"
  | "shooter"
  | "skateboard"
  | "snake"
  | "sports"
  | "stickman"
  | "strategy"
  | "tanks"
  | "trivia"
  | "war";

export interface CategoryOption {
  value: Category;
  label: string;
  icon: string;
}

// GamePix Feed API response
export interface GamePixFeed {
  version?: string;
  title?: string;
  home_page_url?: string;
  feed_url?: string;
  next_url?: string;
  previous_url?: string;
  first_page_url?: string;
  last_page_url?: string;
  modified?: string;
  items: Game[];
}
