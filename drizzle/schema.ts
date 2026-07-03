import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, tinyint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  adminId: int("adminId").notNull(), // Foreign key to users table (professor)
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["Teologia", "Bíblia", "Mentalidade Cristã Extraordinária"]).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(), // Foreign key to courses table
  title: varchar("title", { length: 255 }).notNull(),
  videoUrl: varchar("videoUrl", { length: 255 }).notNull(),
  materialUrl: varchar("materialUrl", { length: 255 }),
  durationMinutes: int("durationMinutes").notNull(), // Max 60 minutes
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

export const studentProgress = mysqlTable("studentProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table (student)
  lessonId: int("lessonId").notNull(), // Foreign key to lessons table
  completed: tinyint("completed").default(0).notNull(),
  progressPercentage: int("progressPercentage").default(0).notNull(), // 0-100
  lastWatchedAt: timestamp("lastWatchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = typeof studentProgress.$inferInsert;

export const supportTickets = mysqlTable("supportTickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  courseId: int("courseId"), // Optional foreign key to courses table
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["open", "in_progress_ai", "in_progress_professor", "closed"]).default("open").notNull(),
  aiResponse: text("aiResponse"),
  professorResponse: text("professorResponse"),
  escalatedToProfessor: tinyint("escalatedToProfessor").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

// TODO: Add your tables here