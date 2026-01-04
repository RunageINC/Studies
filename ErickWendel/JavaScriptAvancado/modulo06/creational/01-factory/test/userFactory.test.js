const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");
const MockDatabase = require("./mocks/dbMock");

rewiremock(() => require("./../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "JOHN DOE" }, { name: "JANE DOE" }];

    rewiremock.enable();

    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    deepStrictEqual(result, expected);

    rewiremock.disable();
  }
  {
    const expected = [{ name: "JOHN DOE" }];

    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    deepStrictEqual(result, expected);
  }
})();
