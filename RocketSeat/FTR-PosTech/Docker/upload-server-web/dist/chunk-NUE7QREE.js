import {
  getUploadsRouteDocSchema
} from "./chunk-4WYQWBZC.js";
import {
  getUploads
} from "./chunk-TXD5XCLU.js";
import {
  unwrapEither
} from "./chunk-NF6HLXUR.js";

// src/infra/http/routes/uploads/get-uploads.ts
var getUploadsRouter = async (server) => {
  server.get("/uploads", { schema: getUploadsRouteDocSchema }, async (req, res) => {
    const { searchQuery, sortBy, sortDirection, page, pageSize } = req.query;
    const result = await getUploads({
      searchQuery,
      sortBy,
      sortDirection,
      page,
      pageSize
    });
    const { uploads, total } = unwrapEither(result);
    return res.status(200).send({ uploads, total });
  });
};

export {
  getUploadsRouter
};
