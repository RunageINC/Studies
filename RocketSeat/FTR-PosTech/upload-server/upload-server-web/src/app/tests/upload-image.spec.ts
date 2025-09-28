import { eq } from 'drizzle-orm';
import { uuidv7 as v7 } from 'uuidv7';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { isLeft, isRight, unwrapEither } from '@/infra/http/shared/either';
import { InvalidFileFormatError } from '../functions/errors/invalid-file-format';
import { uploadImage } from '../functions/upload-image';
import { UploadFileTestDataBuilder } from './test-data-builder/UploadFileDataBuilder';

describe('#uploadImage', () => {
  beforeAll(() => {
    vi.mock('@/infra/storage/upload-file-to-storage', () => ({
      uploadFileToStorage: vi.fn().mockImplementation(() => ({
        key: `${v7()}-mocked.jpg`,
        url: 'https://mockedtest.jpg',
      })),
    }));
  });
  it('should be able to upload an image successfully', async () => {
    const mockedFile = UploadFileTestDataBuilder.anUploadFile()
      .withFileName(`${v7()}-mocked.jpg`)
      .build();

    // Pode ser chamado de sut, que significa System Under Test
    const result = await uploadImage(mockedFile);

    expect(isRight(result)).toBe(true);

    const resultFromDb = await db
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.name, mockedFile.fileName));

    expect(resultFromDb).toHaveLength(1);
  });

  it('should not be able to upload an image with an invalid format', async () => {
    const mockedFile = UploadFileTestDataBuilder.anUploadFile()
      .withFileName(`${v7()}-mocked.jpg`)
      .withContentType('document/pdf')
      .build();

    const result = await uploadImage(mockedFile);

    expect(isLeft(result)).toBe(true);
    expect(unwrapEither(result)).toBeInstanceOf(InvalidFileFormatError);
  });
});
