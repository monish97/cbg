import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import type { Game, Category } from "@/types";

export function useGames() {
  const [category, setCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Determine the query endpoint based on selected category
  const queryKey = category === "all" 
    ? ["/api/games"] 
    : [`/api/games/category/${category}`];

  // Query games based on category
  const {
    data: gamesData = [],
    isLoading,
    error,
  } = useQuery<Game[]>({
    queryKey,
  });

  // Use the typed games data
  const games = gamesData as Game[];

  // Filter games by search query (category filtering is handled by the API)
  const filteredGames = games.filter((game) => {
    return game.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get a single game by ID
  const getGameById = useCallback((id: string) => {
    return games.find((game) => game.id === id);
  }, [games]);

  // Handle category change with a stable callback
  const handleCategoryChange = useCallback((newCategory: Category) => {
    console.log("Category changed to:", newCategory);
    setCategory(newCategory);
  }, []);

  // Debug logging - moved to useEffect to prevent hook rule violations
  useEffect(() => {
    console.log(`Current category: ${category}`);
    console.log(`Total games: ${games.length}`);
    console.log(`Filtered by search: ${filteredGames.length}`);
  }, [category, games.length, filteredGames.length]);

  return {
    games: filteredGames,
    allGames: games,
    isLoading,
    error,
    category,
    setCategory: handleCategoryChange,
    searchQuery,
    setSearchQuery,
    getGameById,
  };
}

export function useGame(id: string) {
  return useQuery<Game>({
    queryKey: ["/api/games", id],
  });
}
