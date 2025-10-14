import {
  env
} from "./chunk-5EBCD4FI.js";

// src/infra/storage/client.ts
import { S3Client } from "@aws-sdk/client-s3";
var r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_ACCESS_KEY_SECRET
  }
});

export {
  r2
};
