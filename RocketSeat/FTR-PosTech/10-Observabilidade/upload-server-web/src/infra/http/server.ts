import { fastifyCors } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { docMetadata } from "./docs/metadata";
import { errorHandler } from "./middleware/error-handler";
import {
  exportUploadsRouter,
  getUploadsRouter,
  healthCheckRouter,
  uploadImageRouter,
} from "./routes/uploads";
import { log } from "../utils/logger";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler(errorHandler);

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifyMultipart);
server.register(fastifySwagger, docMetadata);
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(uploadImageRouter);
server.register(getUploadsRouter);
server.register(exportUploadsRouter);
server.register(healthCheckRouter);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  log.info("Server is running on port 3333");
});
