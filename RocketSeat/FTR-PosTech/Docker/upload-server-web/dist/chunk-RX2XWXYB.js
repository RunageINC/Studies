// src/infra/http/middleware/error-handler.ts
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
var errorHandler = (error, req, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(400).send({
      message: "Validation error",
      issues: error.validation
    });
  }
  console.error(error);
  return res.status(500).send({
    message: "Internal server error"
  });
};

export {
  errorHandler
};
