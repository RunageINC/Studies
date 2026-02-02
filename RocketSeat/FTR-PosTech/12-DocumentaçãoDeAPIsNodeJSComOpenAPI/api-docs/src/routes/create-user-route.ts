import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/users', {
        schema: {
            summary: 'Create a new user',
            security: [{ bearerAuth: [] }],
            description: 'Create a new user',
            tags: ['users'],
            body: z.object({
                name: z.string().max(100).optional(),
                email: z.string().email(),
            }),
            response: {
                201: z.object({
                    id: z.uuid().describe('New user ID'),
                }).describe('User created'),
                400: z.object({
                    errors: z.array(
                        z.object({
                            name: z.string(),
                            error: z.string(),
                        })
                    ),
                }).describe('Validation fails'),
                409: z.object({
                    message: z.string(),
                }).describe('User e-mail already exists.'),
            },
        },
    }, async (request, reply) => {
        const { name, email } = request.body;
        // TODO: Implement actual user creation logic (e.g., save to database)
        const user = {
            id: crypto.randomUUID(),
            name,
            email,
        };
        return reply.status(201).send(user);
    })
}
