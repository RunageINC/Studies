const dbData = [{ name: "John Doe" }, { name: "Jane Doe" }];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

module.exports = MockDatabase;
