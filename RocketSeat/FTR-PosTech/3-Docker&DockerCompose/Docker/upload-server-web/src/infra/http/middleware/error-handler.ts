import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

export const errorHandler = (error, req, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    });
  }

  //envia o erro para alguma ferramenta de observabilidade

  console.error(error);

  return res.status(500).send({
    message: 'Internal server error',
  });
};
