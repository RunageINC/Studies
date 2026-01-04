
#NestJS

We know that repositories underneath the hood creates queries. It is an automated process just like spring with the JPA Query Methods, it runs queries through a more fluent language. But just like spring, we can also generate queries manually, by using the query builder.

The QueryBuilder is a powerful and flexible tool that allows us to build SQL queries dynamically using a fluent API. It is better for running more complex queries, joins and conditions. It also has a good support for transactions, being able to commit transactions or rollback transactions depending on the flow, granting consistency between data:

```typescript
import { dataSource } from "../data-source";
import { User } from "../entities/User";

async function transferFunds(fromUserId: number, toUserId: number, amount: number) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Deduct balance from sender
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ balance: () => `balance - ${amount}` })
      .where("id = :id", { id: fromUserId })
      .execute();

    // Add balance to recipient
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ balance: () => `balance + ${amount}` })
      .where("id = :id", { id: toUserId })
      .execute();

    // Commit transaction
    await queryRunner.commitTransaction();
  } catch (error) {
    // Rollback transaction if any error occurs
    await queryRunner.rollbackTransaction();
    console.error("Transaction failed: ", error);
  } finally {
    // Release query runner
    await queryRunner.release();
  }
}
```

It also supports raw queries:

```typescript
import { dataSource } from "../data-source";

async function transferFunds(fromUserId: number, toUserId: number, amount: number) {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect(); // Establish connection
  await queryRunner.startTransaction(); // Start transaction

  try {
    // Deduct balance from sender
    await queryRunner.query(
      `UPDATE user SET balance = balance - $1 WHERE id = $2`,
      [amount, fromUserId]
    );

    // Add balance to recipient
    await queryRunner.query(
      `UPDATE user SET balance = balance + $1 WHERE id = $2`,
      [amount, toUserId]
    );

    // Insert transaction log
    await queryRunner.query(
      `INSERT INTO transactions (from_user, to_user, amount, created_at) VALUES ($1, $2, $3, NOW())`,
      [fromUserId, toUserId, amount]
    );

    // Commit the transaction
    await queryRunner.commitTransaction();
  } catch (error) {
    // Rollback transaction in case of failure
    await queryRunner.rollbackTransaction();
    console.error("Transaction failed:", error);
  } finally {
    // Release the query runner, closing the query runner and freeing up resources
    await queryRunner.release();
  }
}
```

#### Example: creating user with multiple queries

```typescript
import { dataSource } from "../data-source";

async function createUserWithProfile(username: string, email: string, profileBio: string) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Insert user
    const result = await queryRunner.query(
      `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id`,
      [username, email]
    );

    const userId = result[0].id;

    // Insert profile linked to user
    await queryRunner.query(
      `INSERT INTO profiles (user_id, bio) VALUES ($1, $2)`,
      [userId, profileBio]
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Transaction failed:", error);
  } finally {
    await queryRunner.release();
  }
}
```


### Transaction approach

It is also possible to use the transaction approach, which produces less boilerplate and handles commit/rollback automatically, instead of it having to be called manually as it must be with query runner:

```typescript
import { dataSource } from "../data-source";
import { User } from "../entities/User";

async function transferFunds(fromUserId: number, toUserId: number, amount: number) {
  await dataSource.transaction(async (manager) => {
    await manager
      .createQueryBuilder()
      .update(User)
      .set({ balance: () => `balance - ${amount}` })
      .where("id = :id", { id: fromUserId })
      .execute();

    await manager
      .createQueryBuilder()
      .update(User)
      .set({ balance: () => `balance + ${amount}` })
      .where("id = :id", { id: toUserId })
      .execute();
  });
}
```

It is also possible to run raw queries with transaction manager:

```typescript
await dataSource.transaction(async (manager) => {
  await manager.query(`UPDATE user SET balance = balance - 100 WHERE id = $1`, [1]);
  await manager.query(`UPDATE user SET balance = balance + 100 WHERE id = $1`, [2]);
});
```

It is important to note that for this to be SQL Injection-free, all the parameters are inserted through arguments, as it prevents strings to be replaced instantly.