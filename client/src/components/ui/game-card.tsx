import { Link } from "wouter";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { 
  Gamepad2, 
  Swords, 
  MapPin, 
  Ghost, 
  Puzzle, 
  Car, 
  Trophy, 
  BrainCircuit, 
  Users 
} from "lucide-react";
import type { Game } from "@/types";

const categoryIcons = {
  action: <Swords className="w-4 h-4 mr-2" />,
  adventure: <MapPin className="w-4 h-4 mr-2" />,
  arcade: <Ghost className="w-4 h-4 mr-2" />,
  puzzle: <Puzzle className="w-4 h-4 mr-2" />,
  racing: <Car className="w-4 h-4 mr-2" />,
  sports: <Trophy className="w-4 h-4 mr-2" />,
  strategy: <BrainCircuit className="w-4 h-4 mr-2" />,
  multiplayer: <Users className="w-4 h-4 mr-2" />,
  default: <Gamepad2 className="w-4 h-4 mr-2" />
};

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const categoryIcon = categoryIcons[game.category as keyof typeof categoryIcons] || categoryIcons.default;
  
  return (
    <Link href={`/game/${game.id}`}>
      <div className="cursor-pointer game-card">
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <div className="relative">
            <img 
              src={game.banner_image} 
              alt={game.title} 
              loading="lazy"
              className="w-full h-40 object-cover"
            />
            {game.isHot && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive">HOT</Badge>
              </div>
            )}
            {game.isNew && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-primary">NEW</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">{game.title}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {categoryIcon}
              <span className="capitalize">{game.category}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
