import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { exportUploads } from '@/app/functions/export-uploads';
import { unwrapEither } from '../../shared/either';
import { exportUploadsRouteDocSchema } from './route-schemas';

export const exportUploadsRouter: FastifyPluginAsyncZod = async (server) => {
  server.post('/uploads/export', { schema: exportUploadsRouteDocSchema }, async (req, res) => {
    const { searchQuery } = req.query;

    const result = await exportUploads({ searchQuery });

    const { reportUrl } = unwrapEither(result);

    return res.status(200).send({ reportUrl });
  });
};
