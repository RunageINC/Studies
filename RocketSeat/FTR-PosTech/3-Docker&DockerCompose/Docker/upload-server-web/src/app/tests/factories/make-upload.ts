import type { InferInsertModel } from 'drizzle-orm';
import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { GetUploadsTestDataBuilder } from '../test-data-builder/UploadGetFileDataBuilder';

export async function makeUpload(overrides?: Partial<InferInsertModel<typeof schema.uploads>>) {
  const mockList = GetUploadsTestDataBuilder.anUpload().build();

  const result = await db
    .insert(schema.uploads)
    .values({ ...mockList, ...overrides })
    .returning();

  return result[0];
}
