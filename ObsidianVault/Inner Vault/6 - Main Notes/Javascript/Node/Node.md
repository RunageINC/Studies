
#Node

Engine que permite executar o Javascript.

[...]

Podemos trazer dependências e deixar explícito de onde são através de uma pequena flag passada ao chamá-la:

```javascript
const assert = require("assert:node");
```

#### OBS: npx garante que o comando será executado de dentro da pasta node_modules.

Podemos passar uma flag para solucionar diretórios. Isso é muito útil quando temos um projeto que chama uma lib de outro projeto, por exemplo uma dependência interna ou módulos distintos em pastas distintas (simulando um monorepo).

Dessa forma, ao rodar o node, basta passar a flag `--experimental-specifier-resolution=node`.

