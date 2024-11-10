import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { db } from '../db';
import { goals } from '../db/schema';
import { and } from 'drizzle-orm';

dayjs.extend(weekOfYear);

export function getPendingWeekGoals() {
    const currentYear = dayjs().year();
    const currentWeek = dayjs().week();

    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select().from(goals).where(and(
            sql.$with
        ))
    )
}