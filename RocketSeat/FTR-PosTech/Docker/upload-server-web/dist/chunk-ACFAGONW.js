// src/infra/db/schemas/uploads.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 as v7 } from "uuidv7";
var uploads = pgTable("uploads", {
  id: text("id").primaryKey().$defaultFn(() => v7()),
  name: text("name").notNull(),
  remoteKey: text("remote_key").notNull().unique(),
  remoteUrl: text("remote_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export {
  uploads
};
