// src/app/functions/errors/invalid-file-format.ts
var InvalidFileFormatError = class extends Error {
  constructor() {
    super("InvalidFileFormatError");
  }
};

export {
  InvalidFileFormatError
};
