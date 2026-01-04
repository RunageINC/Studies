import { Readable } from 'node:stream';
import { z } from 'zod';
import { db } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { type Either, makeLeft, makeRight } from '@/infra/http/shared/either';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { InvalidFileFormatError } from './errors/invalid-file-format';

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadImageInput = z.input<typeof uploadImageInput>;
type UploadImageOutput = { url: string };

const allowedMimetypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

export async function uploadImage(
  input: UploadImageInput,
): Promise<Either<InvalidFileFormatError, UploadImageOutput>> {
  const { contentType, contentStream, fileName } = uploadImageInput.parse(input);

  if (!allowedMimetypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormatError());
  }

  const { key, url } = await uploadFileToStorage({
    fileName,
    folder: 'images',
    contentType,
    contentStream,
  });

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: key,
    remoteUrl: url,
  });

  return makeRight({ url });
}
