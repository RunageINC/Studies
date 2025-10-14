// src/app/tests/test-data-builder/UploadGetFileDataBuilder.ts
import { fakerPT_BR as faker } from "@faker-js/faker";
import { uuidv7 as v7 } from "uuidv7";
var GetUploadsTestDataBuilder = class _GetUploadsTestDataBuilder {
  createdAt;
  id;
  name;
  remoteKey;
  remoteUrl;
  constructor({ createdAt, id, name, remoteKey, remoteUrl } = {
    createdAt: /* @__PURE__ */ new Date(),
    id: v7(),
    name: `${v7()}-${faker.system.fileName()}.jpg`,
    remoteKey: `images/${v7()}-${faker.lorem.slug()}.jpg`,
    remoteUrl: `${faker.internet.url()}/images/${v7()}-${faker.system.fileName()}.jpg`
  }) {
    this.createdAt = createdAt;
    this.id = id;
    this.name = name;
    this.remoteKey = remoteKey;
    this.remoteUrl = remoteUrl;
  }
  static anUpload() {
    return new _GetUploadsTestDataBuilder();
  }
  withCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
  withId(id) {
    this.id = id;
  }
  withName(name) {
    this.name = name;
  }
  withRemoteKey(remoteKey) {
    this.remoteKey = remoteKey;
  }
  withRemoteUrl(remoteUrl) {
    this.remoteUrl = remoteUrl;
  }
  build() {
    const uploadResult = new _GetUploadsTestDataBuilder({
      createdAt: this.createdAt,
      id: this.id,
      name: this.name,
      remoteKey: this.remoteKey,
      remoteUrl: this.remoteUrl
    });
    return uploadResult;
  }
};

export {
  GetUploadsTestDataBuilder
};
