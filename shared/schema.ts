import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  twitterUrl: text("twitter_url"),
  profileImage: text("profile_image"),
  aboutImage: text("about_image"),
});

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  proficiency: text("proficiency").notNull(), // percentage as string
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  featured: text("featured").notNull().default("false"),
});

export const experiences = pgTable("experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  current: text("current").notNull().default("false"),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql`NOW()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
