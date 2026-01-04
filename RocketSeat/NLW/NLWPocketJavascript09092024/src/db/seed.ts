import { client, db } from '.';
import { goals, goalCompletions } from './schema';
import dayjs from 'dayjs';

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Wake up early',
        desiredWeeklyFrequency: 5,
        createdBy: 'seed',
        updatedBy: 'seed',
      },
      {
        title: 'Exercise',
        desiredWeeklyFrequency: 3,
        createdBy: 'seed',
        updatedBy: 'seed',
      },
      {
        title: 'Meditate',
        desiredWeeklyFrequency: 1,
        createdBy: 'seed',
        updatedBy: 'seed',
      },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
      updatedAt: startOfWeek.toDate(),
      createdBy: 'seed',
      updatedBy: 'seed',
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.toDate(),
      updatedAt: startOfWeek.add(1, 'day').toDate(),
      createdBy: 'seed',
      updatedBy: 'seed',
    },
  ]);
}

seed().finally(() => {
  console.log('Seeding complete');

  client.end();
});
