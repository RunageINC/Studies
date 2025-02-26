import { Transform, Duplex } from "stream";

let count = 0;

const server = new Duplex({
  objectMode: true, //faz não precisar trabalhar com buffer mas gasta mais memória
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Arthur[${count}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
  // Totalmente independente, como um obj completamente diferente
  write(chunk, encoding, cb) {
    console.log("[writable] saving", chunk);
    cb();
  },
});

// para provar que são canais de comunicação diferentes
// write aciona o writable do Duplex
server.write("[duplex] hey this is writable pipe\n");

// loga o que rolou no .push do readable
// server.on("data", (msg) => console.log(`[readable]${msg}`));

// push deixa enviar mais dados
server.push(`[duplex] hey this is also a readable\n`);

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    cb(null, chunk.toUpperCase());
  },
});

//Transform é também um duplex mas não possui comunicação independente
transformToUpperCase.write(`[transform] hello from write\n`);
transformToUpperCase.push(`[transform] hello from push\n`);

// server.pipe(process.stdout);

server.pipe(transformToUpperCase).pipe(server);
