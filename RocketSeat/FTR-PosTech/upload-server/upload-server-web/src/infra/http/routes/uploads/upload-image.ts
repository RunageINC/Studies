import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { uploadImage } from '@/app/functions/upload-image';
import { isRight, unwrapEither } from '../../shared/either';
import { uploadImageRouteDocSchema } from './route-schemas';

const FOUR_MEGABYTES = 1024 * 1024 * 4;

export const uploadImageRouter: FastifyPluginAsyncZod = async (server) => {
  server.post('/uploads', { schema: uploadImageRouteDocSchema }, async (req, res) => {
    const uploadedFile = await req.file({
      limits: {
        fileSize: FOUR_MEGABYTES,
      },
    });

    if (!uploadedFile) {
      return res.status(400).send({ message: 'File is required' });
    }

    const result = await uploadImage({
      fileName: uploadedFile.filename,
      contentType: uploadedFile.mimetype,
      contentStream: uploadedFile.file,
    });

    if (uploadedFile.file.truncated) {
      return res.status(400).send({ message: 'File is too large' });
    }

    if (isRight(result)) {
      return res.status(201).send();
    }

    const error = unwrapEither(result);

    switch (error.constructor.name) {
      case 'InvalidFileFormatError':
        return res.status(400).send({ message: error.message });
      default:
        return res.status(400).send({ message: error.message });
    }
  });
};
