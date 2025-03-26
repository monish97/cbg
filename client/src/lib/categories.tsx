import { Category } from "@/types";
import { 
  Gamepad2, // All
  Swords, // Action
  MapPin, // Adventure
  Ghost, // Arcade
  Crosshair, // Battle Royale
  Activity, // Basketball
  Blocks, // Block
  SquareCheck, // Board
  CircleDot, // Ball
  Sparkles, // Fun
  Pencil, // Drawing
  GraduationCap, // Educational
  Flame, // Fighting
  Trees, // Christmas
  Candy, // Halloween
  TimerReset, // Idle
  Baby, // Kids
  Grid3X3, // Match-3
  Brain, // Memory
  Smartphone, // Mobile
  Skull, // Monster
  PersonStanding, // Parkour
  Puzzle, // Puzzle
  Car, // Racing
  Gamepad, // Retro
  Bot, // Robots
  Footprints, // Runner
  Target, // Shooter
  KeyRound, // Skateboard
  ScrollText, // Trivia
  HeartPulse, // Snake
  Trophy, // Sports
  User, // Stickman
  BrainCircuit, // Strategy
  ArrowDownToLine, // Tanks
  Sword, // War
} from "lucide-react";

export const categoryOptions = [
  { value: "all", label: "All Games", icon: <Gamepad2 className="w-4 h-4 mr-2" /> },
  { value: "action", label: "Action", icon: <Swords className="w-4 h-4 mr-2" /> },
  { value: "adventure", label: "Adventure", icon: <MapPin className="w-4 h-4 mr-2" /> },
  { value: "arcade", label: "Arcade", icon: <Ghost className="w-4 h-4 mr-2" /> },
  { value: "ball", label: "Ball", icon: <CircleDot className="w-4 h-4 mr-2" /> },
  { value: "battle-royale", label: "Battle Royale", icon: <Crosshair className="w-4 h-4 mr-2" /> },
  { value: "basketball", label: "Basketball", icon: <Activity className="w-4 h-4 mr-2" /> },
  { value: "block", label: "Block", icon: <Blocks className="w-4 h-4 mr-2" /> },
  { value: "board", label: "Board", icon: <SquareCheck className="w-4 h-4 mr-2" /> },
  { value: "casual", label: "Casual", icon: <Sparkles className="w-4 h-4 mr-2" /> },
  { value: "christmas", label: "Christmas", icon: <Trees className="w-4 h-4 mr-2" /> },
  { value: "drawing", label: "Drawing", icon: <Pencil className="w-4 h-4 mr-2" /> },
  { value: "educational", label: "Educational", icon: <GraduationCap className="w-4 h-4 mr-2" /> },
  { value: "fighting", label: "Fighting", icon: <Flame className="w-4 h-4 mr-2" /> },
  { value: "fun", label: "Fun", icon: <Sparkles className="w-4 h-4 mr-2" /> },
  { value: "halloween", label: "Halloween", icon: <Candy className="w-4 h-4 mr-2" /> },
  { value: "idle", label: "Idle", icon: <TimerReset className="w-4 h-4 mr-2" /> },
  { value: "kids", label: "Kids", icon: <Baby className="w-4 h-4 mr-2" /> },
  { value: "match-3", label: "Match 3", icon: <Grid3X3 className="w-4 h-4 mr-2" /> },
  { value: "memory", label: "Memory", icon: <Brain className="w-4 h-4 mr-2" /> },
  { value: "mobile", label: "Mobile", icon: <Smartphone className="w-4 h-4 mr-2" /> },
  { value: "monster", label: "Monster", icon: <Skull className="w-4 h-4 mr-2" /> },
  { value: "parkour", label: "Parkour", icon: <PersonStanding className="w-4 h-4 mr-2" /> },
  { value: "puzzle", label: "Puzzle", icon: <Puzzle className="w-4 h-4 mr-2" /> },
  { value: "racing", label: "Racing", icon: <Car className="w-4 h-4 mr-2" /> },
  { value: "retro", label: "Retro", icon: <Gamepad className="w-4 h-4 mr-2" /> },
  { value: "robots", label: "Robots", icon: <Bot className="w-4 h-4 mr-2" /> },
  { value: "runner", label: "Runner", icon: <Footprints className="w-4 h-4 mr-2" /> },
  { value: "shooter", label: "Shooter", icon: <Target className="w-4 h-4 mr-2" /> },
  { value: "skateboard", label: "Skateboard", icon: <KeyRound className="w-4 h-4 mr-2" /> },
  { value: "snake", label: "Snake", icon: <HeartPulse className="w-4 h-4 mr-2" /> },
  { value: "sports", label: "Sports", icon: <Trophy className="w-4 h-4 mr-2" /> },
  { value: "stickman", label: "Stickman", icon: <User className="w-4 h-4 mr-2" /> },
  { value: "strategy", label: "Strategy", icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
  { value: "tanks", label: "Tanks", icon: <ArrowDownToLine className="w-4 h-4 mr-2" /> },
  { value: "trivia", label: "Trivia", icon: <ScrollText className="w-4 h-4 mr-2" /> },
  { value: "war", label: "War", icon: <Sword className="w-4 h-4 mr-2" /> },
  // Added to match API categories
  { value: "animal", label: "Animal", icon: <Skull className="w-4 h-4 mr-2" /> },
];

// Get a sorted subset of the most popular categories for display constraints
export const getPopularCategories = (limit: number = 8): typeof categoryOptions => {
  // Start with "all" and a subset of the most common/popular categories
  const popularCategoryValues = [
    "all", "action", "adventure", "arcade", "puzzle", 
    "racing", "sports", "strategy", "shooter", "kids"
  ];
  
  // Filter the main list to get only the popular ones, maintaining their original order
  const popular = categoryOptions.filter(cat => 
    popularCategoryValues.includes(cat.value as string)
  );
  
  // Return only the requested number of categories
  return popular.slice(0, limit);
};