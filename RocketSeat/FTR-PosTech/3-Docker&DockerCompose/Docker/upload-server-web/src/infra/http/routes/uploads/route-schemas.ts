import { z } from 'zod';

export const uploadImageRouteDocSchema = {
  summary: 'Upload image',
  consumes: ['multipart/form-data'],
  description: 'Upload image to the server',
  response: {
    201: z.null().describe('Upload successful'),
    400: z.object({ message: z.string() }),
    409: z.object({ message: z.string() }).describe('Upload already exists'),
  },
};

export const getUploadsRouteDocSchema = {
  summary: 'Get uploads',
  description: 'Get uploads from the server',
  querystring: z.object({
    searchQuery: z.string().optional(),
    sortBy: z.enum(['createdAt']).optional(),
    sortDirection: z.enum(['asc', 'desc']).optional(),
    page: z.coerce.number().optional().default(1),
    pageSize: z.coerce.number().optional().default(20),
  }),
  response: {
    200: z.object({
      uploads: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          remoteKey: z.string(),
          remoteUrl: z.string(),
          createdAt: z.date(),
        }),
      ),
      total: z.number(),
    }),
  },
};

export const exportUploadsRouteDocSchema = {
  summary: 'Export uploads',
  description: 'Export uploads from the server',
  querystring: z.object({
    searchQuery: z.string().optional(),
  }),
  response: {
    200: z.object({
      reportUrl: z.string(),
    }),
  },
};
