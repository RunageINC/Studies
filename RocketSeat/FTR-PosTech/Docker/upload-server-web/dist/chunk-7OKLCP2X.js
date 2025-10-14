import {
  InvalidFileFormatError
} from "./chunk-VE4IDH7U.js";
import {
  uploadFileToStorage
} from "./chunk-VXP44ZMB.js";
import {
  makeLeft,
  makeRight
} from "./chunk-NF6HLXUR.js";
import {
  db
} from "./chunk-2IXB3QIS.js";
import {
  schema
} from "./chunk-5C6EDXTT.js";

// src/app/functions/upload-image.ts
import { Readable } from "stream";
import { z } from "zod";
var uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable)
});
var allowedMimetypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
async function uploadImage(input) {
  const { contentType, contentStream, fileName } = uploadImageInput.parse(input);
  if (!allowedMimetypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormatError());
  }
  const { key, url } = await uploadFileToStorage({
    fileName,
    folder: "images",
    contentType,
    contentStream
  });
  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: key,
    remoteUrl: url
  });
  return makeRight({ url });
}

export {
  uploadImage
};
