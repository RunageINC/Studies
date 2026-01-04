import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";

const readable = Readable({
  read() {
    for (let i = 0; i < 1e5; i++) {
      const person = { id: Date.now() + i, name: `Arthur-${i}` };
      const data = JSON.stringify(person);

      this.push(data);
    }

    this.push(null);
  },
});

// processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;

    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.cuonter ?? 0;

    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter++;
    cb(null, "id,name\n".concat(chunk));
  },
});

//sempre a saída -> imprimir, salvar ou ignorar
// const writable = Writable({
//   write(chunk, encoding, cb) {
//     cb();
//   },
// });

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream("my.csv"));

// ou
// readable.pipe(mapFields).pipe(mapHeaders).pipe(process.stdout);

// pipeline.on("start", () => console.log("start"));
pipeline.on("end", () => console.log("done"));
