// src/app/tests/test-data-builder/UploadFileDataBuilder.ts
import { Readable } from "stream";
var UploadFileTestDataBuilder = class _UploadFileTestDataBuilder {
  contentStream;
  fileName;
  contentType;
  constructor({ contentStream, fileName, contentType } = {
    contentStream: Readable.from([]),
    fileName: "integrationTest.jpg",
    contentType: "image/jpeg"
  }) {
    this.contentStream = contentStream;
    this.fileName = fileName;
    this.contentType = contentType;
  }
  static anUploadFile() {
    return new _UploadFileTestDataBuilder();
  }
  withContentStream(contentStream) {
    this.contentStream = contentStream;
    return this;
  }
  withFileName(fileName) {
    this.fileName = fileName;
    return this;
  }
  withContentType(contentType) {
    this.contentType = contentType;
    return this;
  }
  build() {
    const file = new _UploadFileTestDataBuilder({
      contentStream: this.contentStream,
      fileName: this.fileName,
      contentType: this.contentType
    });
    return file;
  }
};

export {
  UploadFileTestDataBuilder
};
