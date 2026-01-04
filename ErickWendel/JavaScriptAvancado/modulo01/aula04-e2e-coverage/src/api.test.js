const { describe, it, after, before } = require("mocha");

const supertest = require("supertest");
const assert = require("assert");

describe("API Suite test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("when request the contact route, then return http status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);
      assert.strictEqual(response.text, "Contact us page");
    });
  });

  describe("/login:post", () => {
    it("when request the login route, then return http status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "JohnDoe", password: "password123" })
        .expect(200);

      assert.strictEqual(response.text, "Login successful");
    });
  });

  describe("/login:post", () => {
    it("when request the login route with invalid credentials, then return http status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "testingMan", password: "password123" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Invalid credentials");
    });
  });

  describe("/hi:get - 404", () => {
    it("should request unexisting route, then return http status 404", async () => {
      const response = await supertest(app).post("/hi").expect(404);
      assert.strictEqual(response.text, "Page not found");
    });
  });
});
