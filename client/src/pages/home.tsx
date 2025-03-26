import { useQuery } from "@tanstack/react-query";
import GameGrid from "@/components/ui/game-grid";
import { useState, useEffect } from "react";
import { Category, Game } from "@/types";

interface HomeProps {
  category: Category;
  searchQuery: string;
}

export default function Home({ category, searchQuery }: HomeProps) {
  const [page, setPage] = useState(1);
  const gamesPerPage = 12;

  // Determine the query endpoint based on selected category
  const queryKey = category === "all" 
    ? ["/api/games"] 
    : [`/api/games/category/${category}`];

  // Query games based on category
  const {
    data: games = [],
    isLoading,
  } = useQuery<Game[]>({
    queryKey,
  });

  // Filter games by search query
  const filteredGames = games.filter((game) => {
    return searchQuery === "" || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Reset pagination when category or filtered games change
  useEffect(() => {
    setPage(1);
  }, [category, searchQuery, filteredGames.length]);

  // Paginate games for "Load More" functionality
  const displayedGames = filteredGames.slice(0, page * gamesPerPage);
  const hasMore = displayedGames.length < filteredGames.length;

  // Debug logging
  useEffect(() => {
    console.log(`Home - Category: ${category}`);
    console.log(`Home - Search query: ${searchQuery}`);
    console.log(`Home - Total games: ${games.length}`);
    console.log(`Home - Filtered games: ${filteredGames.length}`);
    console.log(`Home - Displayed games: ${displayedGames.length}`);
    
    if (filteredGames.length > 0) {
      console.log("Home - First few filtered games:", filteredGames.slice(0, 3).map(g => ({
        title: g.title,
        category: g.category
      })));
    }
  }, [category, searchQuery, games.length, filteredGames.length, displayedGames.length]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto">
      <GameGrid 
        games={displayedGames}
        isLoading={isLoading}
        currentCategory={category}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  );
}
