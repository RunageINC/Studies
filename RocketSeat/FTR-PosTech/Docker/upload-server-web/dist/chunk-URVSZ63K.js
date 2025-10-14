import {
  exportUploadsRouteDocSchema
} from "./chunk-4WYQWBZC.js";
import {
  exportUploads
} from "./chunk-HZ5NJDXC.js";
import {
  unwrapEither
} from "./chunk-NF6HLXUR.js";

// src/infra/http/routes/uploads/export-uploads.ts
var exportUploadsRouter = async (server) => {
  server.post("/uploads/export", { schema: exportUploadsRouteDocSchema }, async (req, res) => {
    const { searchQuery } = req.query;
    const result = await exportUploads({ searchQuery });
    const { reportUrl } = unwrapEither(result);
    return res.status(200).send({ reportUrl });
  });
};

export {
  exportUploadsRouter
};
