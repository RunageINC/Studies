const { describe, it, after, before } = require("mocha");

const supertest = require("supertest");
const { expect } = require("chai");

describe("API Test Suite", () => {
  let app;

  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/rent:get", () => {
    it(
      "when requesting the rent route, with no car category, should return 400"
    );
    it(
      "when requesting the rent route, with invalid car category, should return 422"
    );
    it(
      "when requesting the rent route, with valid car category but no car found, should return 404"
    );
    it(
      "when requesting the rent route, with valid car category, should return 200"
    );
  });
});
