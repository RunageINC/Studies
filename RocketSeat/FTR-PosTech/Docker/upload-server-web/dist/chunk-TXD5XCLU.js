import {
  selectTotalQuery,
  selectWithFiltersQuery
} from "./chunk-7KBLYYEK.js";
import {
  makeRight
} from "./chunk-NF6HLXUR.js";

// src/app/functions/get-uploads.ts
import { z } from "zod";
var getUploadsInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(["createdAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20)
});
async function getUploads(input) {
  const { searchQuery, sortBy, sortDirection, page, pageSize } = getUploadsInput.parse(input);
  const selectWithFilters = selectWithFiltersQuery({
    searchQuery,
    sortBy,
    sortDirection,
    page,
    pageSize
  });
  const selectTotal = selectTotalQuery({ searchQuery });
  const resultsFromDb = await Promise.all([selectWithFilters, selectTotal]);
  const [uploads, [{ total }]] = resultsFromDb;
  return makeRight({ uploads, total });
}

export {
  getUploads
};
