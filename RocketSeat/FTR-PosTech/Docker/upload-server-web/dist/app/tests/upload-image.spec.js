import {
  UploadFileTestDataBuilder
} from "../../chunk-3OY4MH77.js";
import {
  uploadImage
} from "../../chunk-7OKLCP2X.js";
import {
  InvalidFileFormatError
} from "../../chunk-VE4IDH7U.js";
import "../../chunk-VXP44ZMB.js";
import "../../chunk-HVFYM3IO.js";
import {
  isLeft,
  isRight,
  unwrapEither
} from "../../chunk-NF6HLXUR.js";
import {
  db
} from "../../chunk-2IXB3QIS.js";
import "../../chunk-5EBCD4FI.js";
import {
  schema
} from "../../chunk-5C6EDXTT.js";
import "../../chunk-ACFAGONW.js";
import "../../chunk-MLKGABMK.js";

// src/app/tests/upload-image.spec.ts
import { eq } from "drizzle-orm";
import { uuidv7 as v7 } from "uuidv7";
import { beforeAll, describe, expect, it, vi } from "vitest";
describe("#uploadImage", () => {
  beforeAll(() => {
    vi.mock("@/infra/storage/upload-file-to-storage", () => ({
      uploadFileToStorage: vi.fn().mockImplementation(() => ({
        key: `${v7()}-mocked.jpg`,
        url: "https://mockedtest.jpg"
      }))
    }));
  });
  it("should be able to upload an image successfully", async () => {
    const mockedFile = UploadFileTestDataBuilder.anUploadFile().withFileName(`${v7()}-mocked.jpg`).build();
    const result = await uploadImage(mockedFile);
    expect(isRight(result)).toBe(true);
    const resultFromDb = await db.select().from(schema.uploads).where(eq(schema.uploads.name, mockedFile.fileName));
    expect(resultFromDb).toHaveLength(1);
  });
  it("should not be able to upload an image with an invalid format", async () => {
    const mockedFile = UploadFileTestDataBuilder.anUploadFile().withFileName(`${v7()}-mocked.jpg`).withContentType("document/pdf").build();
    const result = await uploadImage(mockedFile);
    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(InvalidFileFormatError);
  });
});
