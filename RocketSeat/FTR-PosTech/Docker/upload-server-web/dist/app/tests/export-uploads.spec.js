import {
  exportUploads
} from "../../chunk-HZ5NJDXC.js";
import {
  makeUpload
} from "../../chunk-CBGQPGJ4.js";
import "../../chunk-JVARMAPM.js";
import "../../chunk-7KBLYYEK.js";
import {
  upload_file_to_storage_exports
} from "../../chunk-VXP44ZMB.js";
import "../../chunk-HVFYM3IO.js";
import {
  isRight,
  unwrapEither
} from "../../chunk-NF6HLXUR.js";
import "../../chunk-2IXB3QIS.js";
import "../../chunk-5EBCD4FI.js";
import "../../chunk-5C6EDXTT.js";
import "../../chunk-ACFAGONW.js";
import "../../chunk-MLKGABMK.js";

// src/app/tests/export-uploads.spec.ts
import { randomUUID } from "crypto";
import { uuidv7 as v7 } from "uuidv7";
import { describe, expect, it, vi } from "vitest";
describe("#exportUploads", () => {
  it("should export uploads", async () => {
    const uploadStub = vi.spyOn(upload_file_to_storage_exports, "uploadFileToStorage").mockImplementationOnce(async () => {
      return {
        key: `${v7()}-mocked.jpg`,
        url: "https://mockedtest.com/file.csv"
      };
    });
    const namePattern = randomUUID();
    const upload1 = await makeUpload({ name: `${namePattern}` });
    const upload2 = await makeUpload({ name: `${namePattern}` });
    const upload3 = await makeUpload({ name: `${namePattern}` });
    const upload4 = await makeUpload({ name: `${namePattern}` });
    const upload5 = await makeUpload({ name: `${namePattern}` });
    const upload6 = await makeUpload({ name: `${namePattern}` });
    const result = await exportUploads({ searchQuery: namePattern });
    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream;
    const csvAsString = await new Promise((resolve, reject) => {
      const chunks = [];
      generatedCSVStream.on("data", (chunk) => {
        chunks.push(chunk);
      });
      generatedCSVStream.on("error", (error) => {
        reject(error);
      });
      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });
    });
    const csvAsArray = csvAsString.trim().split("\n").map((row) => row.split(","));
    expect(isRight(result)).toBe(true);
    expect(unwrapEither(result)).toEqual({
      reportUrl: "https://mockedtest.com/file.csv"
    });
    expect(csvAsArray).toEqual([
      ["ID", "Name", "Remote URL", "Created At"],
      [upload6.id, upload6.name, upload6.remoteUrl, expect.any(String)],
      [upload5.id, upload5.name, upload5.remoteUrl, expect.any(String)],
      [upload4.id, upload4.name, upload4.remoteUrl, expect.any(String)],
      [upload3.id, upload3.name, upload3.remoteUrl, expect.any(String)],
      [upload2.id, upload2.name, upload2.remoteUrl, expect.any(String)],
      [upload1.id, upload1.name, upload1.remoteUrl, expect.any(String)]
    ]);
  });
});
