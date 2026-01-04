import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getUploads } from '@/app/functions/get-uploads';
import { unwrapEither } from '../../shared/either';
import { getUploadsRouteDocSchema } from './route-schemas';

export const getUploadsRouter: FastifyPluginAsyncZod = async (server) => {
  server.get('/uploads', { schema: getUploadsRouteDocSchema }, async (req, res) => {
    const { searchQuery, sortBy, sortDirection, page, pageSize } = req.query;

    const result = await getUploads({
      searchQuery: searchQuery,
      sortBy: sortBy,
      sortDirection: sortDirection,
      page: page,
      pageSize: pageSize,
    });

    const { uploads, total } = unwrapEither(result);

    return res.status(200).send({ uploads, total });
  });
};
