import {
  GetUploadsTestDataBuilder
} from "./chunk-JVARMAPM.js";
import {
  db
} from "./chunk-2IXB3QIS.js";
import {
  schema
} from "./chunk-5C6EDXTT.js";

// src/app/tests/factories/make-upload.ts
async function makeUpload(overrides) {
  const mockList = GetUploadsTestDataBuilder.anUpload().build();
  const result = await db.insert(schema.uploads).values({ ...mockList, ...overrides }).returning();
  return result[0];
}

export {
  makeUpload
};
