import { boolean, jsonb, pgTable, serial, text, timestamp, unique, integer } from "drizzle-orm/pg-core"
import type { PseoFaq } from "@/lib/pseo/types"

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const strategyCallBookings = pgTable(
  "strategy_call_bookings",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    phone: text("phone"),
    projectType: text("project_type"),
    notes: text("notes"),
    slotStart: timestamp("slot_start", { withTimezone: true }).notNull(),
    durationMin: integer("duration_min").notNull().default(30),
    status: text("status").notNull().default("confirmed"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.slotStart)],
)

export const contentEntries = pgTable(
  "content_entries",
  {
    id: serial("id").primaryKey(),
    collection: text("collection").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    intro: text("intro").notNull(),
    headline: text("headline"),
    body: text("body"),
    author: text("author"),
    href: text("href"),
    image: text("image"),
    features: jsonb("features").$type<string[]>().default([]),
    faqs: jsonb("faqs").$type<PseoFaq[]>().default([]),
    tags: jsonb("tags").$type<string[]>().default([]),
    keywords: jsonb("keywords").$type<string[]>().default([]),
    date: text("date"),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    publishedAt: timestamp("published_at"),
  },
  (table) => [unique().on(table.collection, table.slug)],
)

export type ContentEntry = typeof contentEntries.$inferSelect
export type NewContentEntry = typeof contentEntries.$inferInsert
