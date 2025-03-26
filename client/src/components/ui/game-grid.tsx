import GameCard from "./game-card";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import type { Game } from "@/types";

interface GameGridProps {
  games: Game[];
  isLoading: boolean;
  currentCategory: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function GameGrid({ 
  games, 
  isLoading, 
  currentCategory,
  onLoadMore,
  hasMore = false
}: GameGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No games found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try changing your search or category selection.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
          {currentCategory === "all" ? "All Games" : `${currentCategory} Games`}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find your favorite online games to play now
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-10 text-center">
          <Button onClick={onLoadMore} className="px-6 py-5">
            Load More Games
          </Button>
        </div>
      )}
    </div>
  );
}
