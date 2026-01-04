import { fakerPT_BR as faker } from '@faker-js/faker';
import { uuidv7 as v7 } from 'uuidv7';
import type { UploadResult } from '@/app/functions/get-uploads';

export class GetUploadsTestDataBuilder {
  public createdAt: Date;
  public id: string;
  public name: string;
  public remoteKey: string;
  public remoteUrl: string;

  constructor(
    { createdAt, id, name, remoteKey, remoteUrl }: UploadResult = {
      createdAt: new Date(),
      id: v7(),
      name: `${v7()}-${faker.system.fileName()}.jpg`,
      remoteKey: `images/${v7()}-${faker.lorem.slug()}.jpg`,
      remoteUrl: `${faker.internet.url()}/images/${v7()}-${faker.system.fileName()}.jpg`,
    },
  ) {
    this.createdAt = createdAt;
    this.id = id;
    this.name = name;
    this.remoteKey = remoteKey;
    this.remoteUrl = remoteUrl;
  }

  static anUpload() {
    return new GetUploadsTestDataBuilder();
  }

  withCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  withId(id: string) {
    this.id = id;
  }

  withName(name: string) {
    this.name = name;
  }

  withRemoteKey(remoteKey: string) {
    this.remoteKey = remoteKey;
  }

  withRemoteUrl(remoteUrl: string) {
    this.remoteUrl = remoteUrl;
  }

  build() {
    const uploadResult = new GetUploadsTestDataBuilder({
      createdAt: this.createdAt,
      id: this.id,
      name: this.name,
      remoteKey: this.remoteKey,
      remoteUrl: this.remoteUrl,
    });

    return uploadResult;
  }
}
