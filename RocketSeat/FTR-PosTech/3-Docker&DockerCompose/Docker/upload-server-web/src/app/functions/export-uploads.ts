import { PassThrough, Transform, type TransformCallback } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { stringify } from 'csv-stringify';
import type { Query } from 'drizzle-orm';
import { z } from 'zod';
import { pg } from '@/infra/db';
import { type Either, makeRight } from '@/infra/http/shared/either';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { selectWithFiltersQuery } from './queries/uploads-queries';

const MAX_CURSOR_DATA_SIZE = 50;

const exportUploadsInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportUploadsInput = z.infer<typeof exportUploadsInput>;
type ExportUploadsOutput = {
  reportUrl: string;
};

export async function exportUploads(
  input: ExportUploadsInput,
): Promise<Either<never, ExportUploadsOutput>> {
  const { searchQuery } = exportUploadsInput.parse(input);

  const { sql, params } = (await selectWithFiltersQuery({ searchQuery, toSQL: true })) as Query;

  const cursor = await pg.unsafe(sql, params as string[]).cursor(MAX_CURSOR_DATA_SIZE);

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'remote_url',
        header: 'Remote URL',
      },
      {
        key: 'created_at',
        header: 'Created At',
      },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding: BufferEncoding, callback: TransformCallback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      },
    }),
    csv,
    uploadToStorageStream,
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    fileName: `${new Date().toISOString()}-uploads.csv`,
    folder: 'downloads',
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
