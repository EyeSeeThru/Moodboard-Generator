import { pgTable, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const moodboards = pgTable("moodboards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  layout: jsonb("layout").notNull(),
  images: jsonb("images").notNull(),
  settings: jsonb("settings").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMoodboardSchema = createInsertSchema(moodboards);
export const selectMoodboardSchema = createSelectSchema(moodboards);
export type InsertMoodboard = z.infer<typeof insertMoodboardSchema>;
export type Moodboard = z.infer<typeof selectMoodboardSchema>;
