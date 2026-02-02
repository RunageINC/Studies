import { fastify } from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import scalarUI from '@scalar/fastify-api-reference';
import { getUsersRoute } from "./routes/get-users-route";
import { createUserRoute } from "./routes/create-user-route";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
    origin: "*",
})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Example API docs",
            version: "1.0.0",
            description: "API documentation for the Example API",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    transform: jsonSchemaTransform,
})

server.register(getUsersRoute)
server.register(createUserRoute)

server.get('/openapi.json', () => {
    return server.swagger();
})

server.register(scalarUI, {
    routePrefix: "/docs",
    configuration: {
        theme: 'bluePlanet',
    }
})

server.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
})