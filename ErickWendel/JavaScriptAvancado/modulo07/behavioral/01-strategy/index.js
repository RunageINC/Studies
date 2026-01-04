import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";
import { LOG, TRANSACTION } from "./constants.js";

import {
  POSTGRES_CONNECTION_STRING,
  MONGODB_CONNECTION_STRING,
} from "./constants.js";

const postgresContext = new ContextStrategy(
  new PostgresStrategy(POSTGRES_CONNECTION_STRING)
);
const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(MONGODB_CONNECTION_STRING)
);

await postgresContext.connect();
await mongoDBContext.connect();

const contextTypes = {
  [LOG]: mongoDBContext,
  [TRANSACTION]: postgresContext,
};

const data = [
  {
    name: "johndoe",
    type: TRANSACTION,
  },
  {
    name: "janedoe",
    type: LOG,
  },
];

for (const { type, name } of data) {
  const context = contextTypes[type];

  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);

  console.log(await context.read());
}
