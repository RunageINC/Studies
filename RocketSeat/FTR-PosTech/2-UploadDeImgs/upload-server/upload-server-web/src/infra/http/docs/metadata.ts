import { transformSwaggerSchema } from '../middleware/transform-swagger-schema';

export const docMetadata = {
  openapi: {
    info: {
      title: 'Upload Server',
      description: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
};
