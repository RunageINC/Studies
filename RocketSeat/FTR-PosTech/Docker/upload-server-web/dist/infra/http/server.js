import "../../chunk-PU3HUDGJ.js";
import {
  uploadImageRouter
} from "../../chunk-NBFOGX62.js";
import {
  docMetadata
} from "../../chunk-U23XYQJO.js";
import {
  errorHandler
} from "../../chunk-RX2XWXYB.js";
import "../../chunk-MOBOE22G.js";
import {
  exportUploadsRouter
} from "../../chunk-URVSZ63K.js";
import {
  getUploadsRouter
} from "../../chunk-NUE7QREE.js";
import "../../chunk-4WYQWBZC.js";
import "../../chunk-HZ5NJDXC.js";
import "../../chunk-TXD5XCLU.js";
import "../../chunk-7KBLYYEK.js";
import "../../chunk-7OKLCP2X.js";
import "../../chunk-VE4IDH7U.js";
import "../../chunk-VXP44ZMB.js";
import "../../chunk-HVFYM3IO.js";
import "../../chunk-NF6HLXUR.js";
import "../../chunk-2IXB3QIS.js";
import "../../chunk-5EBCD4FI.js";
import "../../chunk-5C6EDXTT.js";
import "../../chunk-ACFAGONW.js";
import "../../chunk-MLKGABMK.js";

// src/infra/http/server.ts
import { fastifyCors } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var server = fastify();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler(errorHandler);
server.register(fastifyCors, {
  origin: "*"
});
server.register(fastifyMultipart);
server.register(fastifySwagger, docMetadata);
server.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
server.register(uploadImageRouter);
server.register(getUploadsRouter);
server.register(exportUploadsRouter);
server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});
