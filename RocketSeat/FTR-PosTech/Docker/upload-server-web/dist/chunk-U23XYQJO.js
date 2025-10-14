import {
  transformSwaggerSchema
} from "./chunk-MOBOE22G.js";

// src/infra/http/docs/metadata.ts
var docMetadata = {
  openapi: {
    info: {
      title: "Upload Server",
      description: "Upload Server",
      version: "1.0.0"
    }
  },
  transform: transformSwaggerSchema
};

export {
  docMetadata
};
