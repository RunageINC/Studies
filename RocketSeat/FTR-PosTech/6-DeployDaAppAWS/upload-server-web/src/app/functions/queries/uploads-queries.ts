import { asc, count, desc, ilike } from 'drizzle-orm';
import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import type { GetUploadsInput } from '../get-uploads';

export const selectWithFiltersQuery = async (
  searchOptions: GetUploadsInput & { toSQL?: boolean },
) => {
  const { searchQuery, sortBy, sortDirection, page, pageSize, toSQL } = searchOptions;

  if (page && pageSize) {
    const query = db
      .select({
        id: schema.uploads.id,
        name: schema.uploads.name,
        remoteKey: schema.uploads.remoteKey,
        remoteUrl: schema.uploads.remoteUrl,
        createdAt: schema.uploads.createdAt,
      })
      .from(schema.uploads)
      .where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined)
      .orderBy((fields) => {
        if (sortBy && sortDirection === 'asc') {
          return asc(fields[sortBy]);
        }
        if (sortBy && sortDirection === 'desc') {
          return desc(fields[sortBy]);
        }
        return desc(fields.id);
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize);

    return toSQL ? query.toSQL() : query;
  }

  const query = db
    .select({
      id: schema.uploads.id,
      name: schema.uploads.name,
      remoteKey: schema.uploads.remoteKey,
      remoteUrl: schema.uploads.remoteUrl,
      createdAt: schema.uploads.createdAt,
    })
    .from(schema.uploads)
    .where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined)
    .orderBy((fields) => {
      if (sortBy && sortDirection === 'asc') {
        return asc(fields[sortBy]);
      }
      if (sortBy && sortDirection === 'desc') {
        return desc(fields[sortBy]);
      }
      return desc(fields.id);
    });

  return toSQL ? query.toSQL() : query;
};

export const selectTotalQuery = async ({ searchQuery }: GetUploadsInput) => {
  const query = db
    .select({ total: count() })
    .from(schema.uploads)
    .where(searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined);

  return query;
};
