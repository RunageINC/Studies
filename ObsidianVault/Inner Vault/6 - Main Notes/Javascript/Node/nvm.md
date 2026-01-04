
#Node

### NVM (Node Version Manager)

Cuida de controlar as versões do [[Node]] através de comandos bem simples executados através do terminal.

Comandos básicos do nvm:

- `nvm install <version>` - Instala a versão especificada do Node.
- `nvm list` - lista as versões do Node
- `nvm install --lts` - Instala a versão **long-term support**, ou seja, a versão recomendada e sem bugs.
- `nvm use <version>` - Define a versão a ser utilizada.
- `nvm alias default <version>` - Define como padrão do sistema a versão específica do Node.

É possível especificar a versão do node por projeto através do arquivo _.nvmrc_. Esse arquivo é bem simples, contendo somente a versão em números do node utilizado:

![[nvm rc file.png]]

Também podemos gerar esse mesmo arquivo utilizando o terminal com o seguinte atalho: 

`node -v > .nvmrc`

E o arquivo será criado com a versão do Node.

Também podemos definir a versão do Node através da tag de engines:

_package.json_
```json
{
  "name": "aula00-nvm",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "20"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

Dessa forma, se tentarmos utilizar uma versão não especificada do node, teremos um aviso no compilador para isso. É uma boa prática para que a versão seja sempre especificada a nível de compilação.