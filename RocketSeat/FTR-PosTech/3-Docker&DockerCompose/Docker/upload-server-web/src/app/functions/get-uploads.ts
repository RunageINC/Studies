import { z } from 'zod';
import { type Either, makeRight } from '@/infra/http/shared/either';
import { selectTotalQuery, selectWithFiltersQuery } from './queries/uploads-queries';

const getUploadsInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
});

export interface UploadResult {
  id: string;
  name: string;
  remoteKey: string;
  remoteUrl: string;
  createdAt: Date;
}

export type GetUploadsInput = z.input<typeof getUploadsInput>;
type GetUploadsOutput = {
  uploads: UploadResult[];
  total: number;
};

export async function getUploads(input: GetUploadsInput): Promise<Either<never, GetUploadsOutput>> {
  const { searchQuery, sortBy, sortDirection, page, pageSize } = getUploadsInput.parse(input);

  const selectWithFilters = selectWithFiltersQuery({
    searchQuery,
    sortBy,
    sortDirection,
    page,
    pageSize,
  });

  const selectTotal = selectTotalQuery({ searchQuery });

  const resultsFromDb = await Promise.all([selectWithFilters, selectTotal]);

  const [uploads, [{ total }]] = resultsFromDb;

  return makeRight({ uploads, total });
}
