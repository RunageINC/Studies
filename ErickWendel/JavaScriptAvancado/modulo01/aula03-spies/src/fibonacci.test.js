const { createSandbox } = require("sinon");
const sinon = createSandbox();
const Fibonacci = require("./fibonacci");

const assert = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for (const sequence of fibonacci.execute(10)) {
    }

    const expectedCount = 11;

    assert.strictEqual(spy.callCount, expectedCount);

    const { args } = spy.getCall(expectedCount - 1);

    const expectedParams = [0, 55, 89];

    assert.deepStrictEqual(args, expectedParams, "Arrays aren't equals");
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    for (const sequence of fibonacci.execute(3)) {
    }

    const expectedCount = 4;

    assert.strictEqual(spy.callCount, expectedCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(5)];
    const expectedCount = 6;

    assert.strictEqual(spy.callCount, expectedCount);

    const { args } = spy.getCall(2);
    const expectedParams = [3, 1, 2];
    assert.deepStrictEqual(args, expectedParams, "Arrays aren't equals");

    const expectedResults = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expectedResults, "Arrays aren't equals");
  }
})();
