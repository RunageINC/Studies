import {
  db
} from "./chunk-2IXB3QIS.js";
import {
  schema
} from "./chunk-5C6EDXTT.js";

// src/app/functions/queries/uploads-queries.ts
import { asc, count, desc, ilike } from "drizzle-orm";
var selectWithFiltersQuery = async (searchOptions) => {
  const { searchQuery, sortBy, sortDirection, page, pageSize, toSQL } = searchOptions;
  if (page && pageSize) {
    const query2 = db.select({
      id: schema.uploads.id,
      name: schema.uploads.name,
      remoteKey: schema.uploads.remoteKey,
      remoteUrl: schema.uploads.remoteUrl,
      createdAt: schema.uploads.createdAt
    }).from(schema.uploads).where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : void 0).orderBy((fields) => {
      if (sortBy && sortDirection === "asc") {
        return asc(fields[sortBy]);
      }
      if (sortBy && sortDirection === "desc") {
        return desc(fields[sortBy]);
      }
      return desc(fields.id);
    }).offset((page - 1) * pageSize).limit(pageSize);
    return toSQL ? query2.toSQL() : query2;
  }
  const query = db.select({
    id: schema.uploads.id,
    name: schema.uploads.name,
    remoteKey: schema.uploads.remoteKey,
    remoteUrl: schema.uploads.remoteUrl,
    createdAt: schema.uploads.createdAt
  }).from(schema.uploads).where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : void 0).orderBy((fields) => {
    if (sortBy && sortDirection === "asc") {
      return asc(fields[sortBy]);
    }
    if (sortBy && sortDirection === "desc") {
      return desc(fields[sortBy]);
    }
    return desc(fields.id);
  });
  return toSQL ? query.toSQL() : query;
};
var selectTotalQuery = async ({ searchQuery }) => {
  const query = db.select({ total: count() }).from(schema.uploads).where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : void 0);
  return query;
};

export {
  selectWithFiltersQuery,
  selectTotalQuery
};
