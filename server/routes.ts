import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import type { Game, GamePixFeed } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for games
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  app.get("/api/games/:id", async (req, res) => {
    try {
      const gameId = req.params.id;
      const game = await storage.getGameById(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      console.error(`Error fetching game ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  app.get("/api/games/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const games = await storage.getGamesByCategory(category);
      res.json(games);
    } catch (error) {
      console.error(`Error fetching games for category ${req.params.category}:`, error);
      res.status(500).json({ message: "Failed to fetch games by category" });
    }
  });

  app.get("/api/games/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const games = await storage.searchGames(query);
      res.json(games);
    } catch (error) {
      console.error(`Error searching games for query ${req.params.query}:`, error);
      res.status(500).json({ message: "Failed to search games" });
    }
  });

  // Fetch games from GamePix API and refresh local storage
  app.get("/api/refresh-games", async (req, res) => {
    try {
      await fetchGamesFromGamePix();
      res.json({ message: "Games refreshed successfully" });
    } catch (error) {
      console.error("Error refreshing games:", error);
      res.status(500).json({ message: "Failed to refresh games" });
    }
  });

  // Helper function to fetch games from GamePix API
  async function fetchGamesFromGamePix() {
    try {
      // Fetch games from the GamePix API endpoint
      const response = await fetch("https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=96&page=1");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from GamePix API: ${response.status} ${response.statusText}`);
      }
      
      const gamePixData = await response.json() as GamePixFeed;
      
      // Clear existing games
      await storage.clearGames();
      
      // Add all games from the API response
      if (gamePixData.items && gamePixData.items.length > 0) {
        // First, let's collect all unique categories from the API
        const uniqueCategories = new Set<string>();
        gamePixData.items.forEach(game => {
          if (game.category) {
            uniqueCategories.add(game.category.toLowerCase());
          }
        });
        
        // Log the unique categories we found for debugging
        console.log("Unique categories from GamePix API:", Array.from(uniqueCategories));
        
        const games = gamePixData.items.map(game => {
          // Simply convert all categories to lowercase for consistency
          const normalizedCategory = game.category ? game.category.toLowerCase() : "other";
          
          // Process games to add custom properties if needed
          const processedGame = {
            id: game.id,
            title: game.title,
            namespace: game.namespace,
            description: game.description,
            category: normalizedCategory,
            orientation: game.orientation || null,
            quality_score: game.quality_score ? String(game.quality_score) : null,
            width: game.width || null,
            height: game.height || null,
            date_modified: game.date_modified || null,
            date_published: game.date_published || null,
            banner_image: game.banner_image,
            image: game.image,
            url: game.url,
            // Set random isHot and isNew for some games
            isHot: Math.random() > 0.8,
            isNew: Math.random() > 0.7 && Math.random() < 0.9
          };
          return processedGame;
        });
        
        // Add each game to storage
        for (const game of games) {
          await storage.addGame(game);
        }
        
        console.log(`Loaded ${games.length} games from GamePix API into storage`);
      } else {
        console.warn("No games found in the GamePix API response");
        // Fall back to sample games if API response is empty
        await loadSampleGames();
      }
    } catch (error) {
      console.error("Error fetching games from GamePix:", error);
      // Fall back to sample games if API fails
      await loadSampleGames();
      throw error;
    }
  }

  // Fallback function to load sample games if API fails
  async function loadSampleGames() {
    try {
      const sampleGames = generateSampleGames();
      await storage.clearGames();
      
      for (const game of sampleGames) {
        await storage.addGame(game);
      }
      
      console.log(`Loaded ${sampleGames.length} sample games into storage (API unavailable)`);
    } catch (err) {
      console.error("Error loading sample games:", err);
    }
  }

  // Initialize games on server start
  fetchGamesFromGamePix().catch(console.error);

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate sample games (fallback if API is unavailable)
function generateSampleGames() {
  const gameCategories = [
    "action", "adventure", "arcade", "puzzle", 
    "racing", "sports", "strategy", "multiplayer"
  ];
  
  const games = [];
  
  // Create 5 games for each category
  for (let i = 0; i < gameCategories.length; i++) {
    const category = gameCategories[i];
    
    for (let j = 0; j < 5; j++) {
      const id = `${category}-${j + 1}`;
      const isHot = Math.random() > 0.8;
      const isNew = !isHot && Math.random() > 0.8;
      
      games.push({
        id,
        title: `${capitalizeFirstLetter(category)} Game ${j + 1}`,
        namespace: `sample-${id}`,
        description: `This is an exciting ${category} game that will keep you entertained for hours. With stunning graphics and engaging gameplay, it's sure to become one of your favorites.`,
        category,
        orientation: "landscape", // String or null
        quality_score: "0.9", // String or null
        width: 800, // Number or null
        height: 600, // Number or null
        date_modified: new Date().toISOString(), // String or null
        date_published: new Date().toISOString(), // String or null
        banner_image: `https://picsum.photos/seed/${id}/500/300`, // Required
        image: `https://picsum.photos/seed/${id}-icon/200/200`, // Required
        url: `https://integration.gamepix.com/sandbox/embed`, // Required
        isHot, // Boolean or null
        isNew // Boolean or null
      });
    }
  }
  
  return games;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
