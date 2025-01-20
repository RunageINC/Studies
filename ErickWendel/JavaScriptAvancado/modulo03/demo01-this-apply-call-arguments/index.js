"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

/* Verifica alterações nesse arquivo index.js
 Se dermos um save nesse arquivo com ele rodando, por exemplo,
 o console irá disparar com "File changed!", com o evento change,
 e filename index.js 

 Já o readFile irá mostrar o conteúdo do arquivo index.js */
// watch(__filename, async (event, filename) => {
//   console.log("File changed!", event, filename);
//   console.log((await readFile(filename)).toString());
// });

class File {
  watch(event, filename) {
    this.showContent(filename);
  }

  async showContent() {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

/** Vale ressaltar que a @var __filename é uma variável reservada
 * do Node.js que retorna o arquivo atual. Essa variável é uma
 * variável global do node, e para evitar conflitos, existe o
 * underscore em sua terminação, assim como o __dirname.
 */
watch(__filename, file.watch); // da erro. Isso porque ele ignora o
// this da classe file e usa o this da classe watch.

// Forma feia de resolver:
watch(__filename, (event, filename) => file.watch(event, filename));

// Forma bonita de resolver:
watch(__filename, file.watch.bind(file));
// O .bind vai substituir o this da função watch pelo this da função file.
// Esse método retorna uma função com o this que estamos passando. Nesse caso,
// do file, mas poderia ser qualquer outro.

file.watch.call(
  { showContent: () => console.log("Call: Show content") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("Call: Show content") }, [
  null,
  __filename,
]);
