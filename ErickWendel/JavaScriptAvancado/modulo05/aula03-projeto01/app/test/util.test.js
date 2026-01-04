const { describe, it } = require("mocha");
const { expect } = require("chai");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util", () => {
  it("#evaluateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

    /**
     * Ficará rodando em looping e quebrando tudo (catastrophic backtracking). O + fica em looping tentando caçar dentro das strings. Removendo ele, passa.
     * time node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eae como vai você e como vai você e como vai você e como vai você?') && console.log('boa');"
     */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe!`
    );
  });

  it("#evaluateRegex should not throw an error using a safe regex", () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw;
    expect(evaluateRegex(safeRegex)).to.be.ok;
  });
});
