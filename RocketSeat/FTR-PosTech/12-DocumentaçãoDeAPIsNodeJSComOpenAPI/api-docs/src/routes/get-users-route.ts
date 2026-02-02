import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUsersRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/users', {
        schema: {
            summary: 'Get all users',
            description: 'Get all users',
            tags: ['users'],
            querystring: z.object({
                page: z.coerce.number().int().min(1).default(1),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                }).describe('A list of users'),
            }
        }
    }, async (request, reply) => {
        return reply.status(200).send({ message: 'Hello World' });
    })
}