import {
  getUploads
} from "../../chunk-TXD5XCLU.js";
import {
  makeUpload
} from "../../chunk-CBGQPGJ4.js";
import "../../chunk-JVARMAPM.js";
import "../../chunk-7KBLYYEK.js";
import {
  isRight,
  unwrapEither
} from "../../chunk-NF6HLXUR.js";
import "../../chunk-2IXB3QIS.js";
import "../../chunk-5EBCD4FI.js";
import "../../chunk-5C6EDXTT.js";
import "../../chunk-ACFAGONW.js";
import "../../chunk-MLKGABMK.js";

// src/app/tests/get-uploads.spec.ts
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
describe("#getUploads", () => {
  it("should return all uploads", async () => {
    const namePattern = randomUUID();
    const upload1 = await makeUpload({ name: `${namePattern}` });
    const upload2 = await makeUpload({ name: `${namePattern}` });
    const upload3 = await makeUpload({ name: `${namePattern}` });
    const upload4 = await makeUpload({ name: `${namePattern}` });
    const upload5 = await makeUpload({ name: `${namePattern}` });
    const upload6 = await makeUpload({ name: `${namePattern}` });
    const result = await getUploads({
      searchQuery: namePattern
    });
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).total).toBe(6);
    expect(unwrapEither(result).uploads).toEqual([
      expect.objectContaining({ id: upload6.id }),
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id })
    ]);
  });
  it("should be able to get paginated uploads", async () => {
    const namePattern = randomUUID();
    const upload1 = await makeUpload({ name: `${namePattern}` });
    const upload2 = await makeUpload({ name: `${namePattern}` });
    const upload3 = await makeUpload({ name: `${namePattern}` });
    const upload4 = await makeUpload({ name: `${namePattern}` });
    const upload5 = await makeUpload({ name: `${namePattern}` });
    const upload6 = await makeUpload({ name: `${namePattern}` });
    let result = await getUploads({
      searchQuery: namePattern,
      page: 1,
      pageSize: 4
    });
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).total).toBe(6);
    expect(unwrapEither(result).uploads).toEqual([
      expect.objectContaining({ id: upload6.id }),
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id })
    ]);
    result = await getUploads({
      searchQuery: namePattern,
      page: 2,
      pageSize: 4
    });
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).total).toBe(6);
    expect(unwrapEither(result).uploads).toEqual([
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload1.id })
    ]);
  });
  it("should be able to get sorted uploads", async () => {
    const namePattern = randomUUID();
    const upload1 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(10, "days").toDate()
    });
    const upload2 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(1, "days").toDate()
    });
    const upload3 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(4, "days").toDate()
    });
    const upload4 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(3, "days").toDate()
    });
    const upload5 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(6, "days").toDate()
    });
    const upload6 = await makeUpload({
      name: `${namePattern}`,
      createdAt: dayjs().subtract(5, "days").toDate()
    });
    let result = await getUploads({
      searchQuery: namePattern,
      sortBy: "createdAt",
      sortDirection: "desc"
    });
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).total).toBe(6);
    expect(unwrapEither(result).uploads).toEqual([
      expect.objectContaining({ id: upload2.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload6.id }),
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload1.id })
    ]);
    result = await getUploads({
      searchQuery: namePattern,
      sortBy: "createdAt",
      sortDirection: "asc"
    });
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result).total).toBe(6);
    expect(unwrapEither(result).uploads).toEqual([
      expect.objectContaining({ id: upload1.id }),
      expect.objectContaining({ id: upload5.id }),
      expect.objectContaining({ id: upload6.id }),
      expect.objectContaining({ id: upload3.id }),
      expect.objectContaining({ id: upload4.id }),
      expect.objectContaining({ id: upload2.id })
    ]);
  });
});
