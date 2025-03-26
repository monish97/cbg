import { games, type Game, type InsertGame } from "@shared/schema";

// Interface for game storage operations
export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Game related operations
  getAllGames(): Promise<Game[]>;
  getGameById(id: string): Promise<Game | undefined>;
  getGamesByCategory(category: string): Promise<Game[]>;
  searchGames(query: string): Promise<Game[]>;
  addGame(game: Game): Promise<Game>;
  updateGame(id: string, game: Partial<Game>): Promise<Game | undefined>;
  deleteGame(id: string): Promise<boolean>;
  clearGames(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private gamesList: Map<string, Game>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.gamesList = new Map();
    this.currentId = 1;
  }

  // User related methods
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game related methods
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.gamesList.values());
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return this.gamesList.get(id);
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    if (category === "all") {
      return this.getAllGames();
    }
    
    return Array.from(this.gamesList.values()).filter(
      (game) => game.category === category
    );
  }

  async searchGames(query: string): Promise<Game[]> {
    if (!query || query.trim() === "") {
      return this.getAllGames();
    }
    
    const lowerQuery = query.toLowerCase();
    return Array.from(this.gamesList.values()).filter(
      (game) => 
        game.title.toLowerCase().includes(lowerQuery) || 
        game.description.toLowerCase().includes(lowerQuery) ||
        game.category.toLowerCase().includes(lowerQuery)
    );
  }

  async addGame(game: Game): Promise<Game> {
    // Process the game data to ensure null values instead of undefined
    const processedGame: Game = {
      id: game.id,
      title: game.title,
      namespace: game.namespace,
      description: game.description,
      category: game.category,
      orientation: game.orientation || null,
      quality_score: game.quality_score || null,
      width: game.width || null,
      height: game.height || null,
      date_modified: game.date_modified || null,
      date_published: game.date_published || null,
      banner_image: game.banner_image,
      image: game.image,
      url: game.url,
      isHot: game.isHot === undefined ? false : game.isHot,
      isNew: game.isNew === undefined ? false : game.isNew
    };
    
    this.gamesList.set(processedGame.id, processedGame);
    return processedGame;
  }

  async updateGame(id: string, updates: Partial<Game>): Promise<Game | undefined> {
    const game = this.gamesList.get(id);
    if (!game) {
      return undefined;
    }
    
    const updatedGame = { ...game, ...updates };
    this.gamesList.set(id, updatedGame);
    
    return updatedGame;
  }

  async deleteGame(id: string): Promise<boolean> {
    return this.gamesList.delete(id);
  }

  async clearGames(): Promise<void> {
    this.gamesList.clear();
  }
}

export const storage = new MemStorage();
