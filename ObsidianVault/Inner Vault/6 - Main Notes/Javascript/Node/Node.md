Engine que permite executar o Javascript.

[...]

Podemos trazer dependências e deixar explícito de onde são através de uma pequena flag passada ao chamá-la:

```javascript
const assert = require("assert:node");
```

#### OBS: npx garante que o comando será executado de dentro da pasta node_modules.
