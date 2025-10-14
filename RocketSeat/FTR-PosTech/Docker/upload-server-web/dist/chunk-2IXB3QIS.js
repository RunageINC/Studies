import {
  env
} from "./chunk-5EBCD4FI.js";
import {
  schema
} from "./chunk-5C6EDXTT.js";

// src/infra/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
var pg = postgres(env.DATABASE_URL);
var db = drizzle(pg, { schema });

export {
  pg,
  db
};
