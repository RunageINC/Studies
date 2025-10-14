import {
  selectWithFiltersQuery
} from "./chunk-7KBLYYEK.js";
import {
  uploadFileToStorage
} from "./chunk-VXP44ZMB.js";
import {
  makeRight
} from "./chunk-NF6HLXUR.js";
import {
  pg
} from "./chunk-2IXB3QIS.js";

// src/app/functions/export-uploads.ts
import { PassThrough, Transform } from "stream";
import { pipeline } from "stream/promises";
import { stringify } from "csv-stringify";
import { z } from "zod";
var MAX_CURSOR_DATA_SIZE = 50;
var exportUploadsInput = z.object({
  searchQuery: z.string().optional()
});
async function exportUploads(input) {
  const { searchQuery } = exportUploadsInput.parse(input);
  const { sql, params } = await selectWithFiltersQuery({ searchQuery, toSQL: true });
  const cursor = await pg.unsafe(sql, params).cursor(MAX_CURSOR_DATA_SIZE);
  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      {
        key: "id",
        header: "ID"
      },
      {
        key: "name",
        header: "Name"
      },
      {
        key: "remote_url",
        header: "Remote URL"
      },
      {
        key: "created_at",
        header: "Created At"
      }
    ]
  });
  const uploadToStorageStream = new PassThrough();
  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks, _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }
        callback();
      }
    }),
    csv,
    uploadToStorageStream
  );
  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    fileName: `${(/* @__PURE__ */ new Date()).toISOString()}-uploads.csv`,
    folder: "downloads",
    contentStream: uploadToStorageStream
  });
  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);
  return makeRight({ reportUrl: url });
}

export {
  exportUploads
};
