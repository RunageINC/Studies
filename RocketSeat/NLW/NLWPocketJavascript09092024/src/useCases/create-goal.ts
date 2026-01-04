import { db } from '../db';
import { goals } from '../db/schema';

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

interface UserDataRequest {
  userId: string;
}

export async function createGoal(
  { title, desiredWeeklyFrequency }: CreateGoalRequest,
  { userId }: UserDataRequest
) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
      createdBy: userId,
      updatedBy: userId,
    })
    .returning();

  const goal = result[0];

  return { goal };
}
