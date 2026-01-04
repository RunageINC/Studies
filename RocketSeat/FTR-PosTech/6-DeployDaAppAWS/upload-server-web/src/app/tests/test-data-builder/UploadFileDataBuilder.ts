import { Readable } from 'node:stream';

type UploadFileProps = {
  contentStream: Readable;
  fileName: string;
  contentType: string;
};

export class UploadFileTestDataBuilder {
  public contentStream: Readable;
  public fileName: string;
  public contentType: string;

  constructor(
    { contentStream, fileName, contentType }: UploadFileProps = {
      contentStream: Readable.from([]),
      fileName: 'integrationTest.jpg',
      contentType: 'image/jpeg',
    },
  ) {
    this.contentStream = contentStream;
    this.fileName = fileName;
    this.contentType = contentType;
  }

  static anUploadFile() {
    return new UploadFileTestDataBuilder();
  }

  withContentStream(contentStream: Readable) {
    this.contentStream = contentStream;
    return this;
  }

  withFileName(fileName: string) {
    this.fileName = fileName;
    return this;
  }

  withContentType(contentType: string) {
    this.contentType = contentType;
    return this;
  }

  build() {
    const file = new UploadFileTestDataBuilder({
      contentStream: this.contentStream,
      fileName: this.fileName,
      contentType: this.contentType,
    });

    return file;
  }
}
