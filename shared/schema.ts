import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the users table as it might be needed for future authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define game schema for storing game data from GamePix API
export const games = pgTable("games", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  namespace: text("namespace").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  orientation: text("orientation"),
  quality_score: text("quality_score"),
  width: integer("width"),
  height: integer("height"),
  date_modified: text("date_modified"),
  date_published: text("date_published"),
  banner_image: text("banner_image").notNull(),
  image: text("image").notNull(),
  url: text("url").notNull(),
  isHot: boolean("is_hot").default(false),
  isNew: boolean("is_new").default(false)
});

export const insertGameSchema = createInsertSchema(games);

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// Define game categories for filtering
export const categories = [
  "all",
  "action",
  "adventure",
  "arcade",
  "battle-royale",
  "basketball",
  "block",
  "board",
  "casual",
  "christmas",
  "drawing",
  "educational",
  "fighting",
  "fun",
  "halloween",
  "idle",
  "kids",
  "match-3",
  "memory",
  "mobile",
  "monster",
  "parkour",
  "puzzle",
  "racing",
  "retro",
  "robots",
  "runner",
  "shooter",
  "skateboard",
  "snake",
  "sports",
  "stickman",
  "strategy",
  "tanks",
  "trivia",
  "war"
];

// Define Game type for frontend usage - aligned with GamePix API
export const GameSchema = z.object({
  id: z.string(),
  title: z.string(),
  namespace: z.string(),
  description: z.string(),
  category: z.string(),
  orientation: z.string().optional(),
  quality_score: z.string().or(z.number()).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  date_modified: z.string().optional(),
  date_published: z.string().optional(),
  banner_image: z.string(),
  image: z.string(),
  url: z.string(),
  isHot: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

export type GameType = z.infer<typeof GameSchema>;

// GamePix API response schema
export const GamePixFeedSchema = z.object({
  version: z.string().optional(),
  title: z.string().optional(),
  home_page_url: z.string().optional(),
  feed_url: z.string().optional(),
  next_url: z.string().optional(),
  previous_url: z.string().optional(),
  first_page_url: z.string().optional(),
  last_page_url: z.string().optional(),
  modified: z.string().optional(),
  items: z.array(GameSchema)
});

export type GamePixFeed = z.infer<typeof GamePixFeedSchema>;
