import { Readable, Writable } from "stream";

const readable = Readable({
  read() {
    this.push("Hello World 1");
    this.push("Hello World 2");
    this.push("Hello World 3");

    // informa que os dados acabaram
    this.push(null);
  },
});

//sempre a saída -> imprimir, salvar ou ignorar
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

readable.pipe(writable);
