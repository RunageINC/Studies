import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createGoal } from '../useCases/create-goal';
import z from 'zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const schema = {
  body: z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  }),
};

app.post('/goals', { schema }, async (req, res) => {
  const { title, desiredWeeklyFrequency } = req.body;
  const userId = req.headers['auth-user-id'];

  console.log(userId);

  if (!userId) return res.status(401).send({ error: 'Unauthorized' });

  await createGoal(
    {
      title,
      desiredWeeklyFrequency,
    },
    { userId: userId as string }
  );
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333');
  });
