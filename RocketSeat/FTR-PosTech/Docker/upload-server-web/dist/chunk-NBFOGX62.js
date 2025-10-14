import {
  uploadImageRouteDocSchema
} from "./chunk-4WYQWBZC.js";
import {
  uploadImage
} from "./chunk-7OKLCP2X.js";
import {
  isRight,
  unwrapEither
} from "./chunk-NF6HLXUR.js";

// src/infra/http/routes/uploads/upload-image.ts
var FOUR_MEGABYTES = 1024 * 1024 * 4;
var uploadImageRouter = async (server) => {
  server.post("/uploads", { schema: uploadImageRouteDocSchema }, async (req, res) => {
    const uploadedFile = await req.file({
      limits: {
        fileSize: FOUR_MEGABYTES
      }
    });
    if (!uploadedFile) {
      return res.status(400).send({ message: "File is required" });
    }
    const result = await uploadImage({
      fileName: uploadedFile.filename,
      contentType: uploadedFile.mimetype,
      contentStream: uploadedFile.file
    });
    if (uploadedFile.file.truncated) {
      return res.status(400).send({ message: "File is too large" });
    }
    if (isRight(result)) {
      return res.status(201).send();
    }
    const error = unwrapEither(result);
    switch (error.constructor.name) {
      case "InvalidFileFormatError":
        return res.status(400).send({ message: error.message });
      default:
        return res.status(400).send({ message: error.message });
    }
  });
};

export {
  uploadImageRouter
};
