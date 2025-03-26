import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, MonitorSmartphone, CalendarClock, Trophy } from "lucide-react";
import { useGame } from "@/hooks/use-games";
import { Badge } from "@/components/ui/badge";

export default function Game() {
  const [match, params] = useRoute<{ id: string }>("/game/:id");
  const { data: game, isLoading, error } = useGame(params?.id || "");

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Game not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the game you're looking for.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{game.title}</h1>
        {game.isHot && (
          <Badge variant="destructive" className="ml-3">HOT</Badge>
        )}
        {game.isNew && (
          <Badge variant="default" className="ml-3 bg-primary">NEW</Badge>
        )}
      </div>

      {/* Game iframe with responsive container */}
      <div className="game-iframe-container bg-black rounded-xl overflow-hidden shadow-lg mb-6 w-full relative" style={{ paddingTop: "56.25%" }}>
        <iframe 
          src={game.url}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          title={game.title}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white dark:bg-secondary rounded-xl p-6 shadow-md md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Game Description</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {game.description}
          </p>
        </Card>

        <Card className="bg-white dark:bg-secondary rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Game Details</h2>
          
          <div className="space-y-4">
            {/* Category */}
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                <p className="font-medium capitalize">{game.category}</p>
              </div>
            </div>
            
            {/* Orientation */}
            {game.orientation && (
              <div className="flex items-center">
                <MonitorSmartphone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Orientation</p>
                  <p className="font-medium capitalize">{game.orientation}</p>
                </div>
              </div>
            )}
            
            {/* Publication Date */}
            {game.date_published && (
              <div className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
                  <p className="font-medium">
                    {new Date(game.date_published).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            
            {/* Game Dimensions */}
            {game.width && game.height && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dimensions</p>
                <p className="font-medium">{game.width} x {game.height}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
