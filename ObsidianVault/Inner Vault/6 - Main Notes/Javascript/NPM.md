
#JavaScript

Gerenciador de pacotes do java.

`npm install` -> Olha pra package.json. Pode acontecer de existirem pacotes que funcionavam antes e não funcionam mais.
`npm ci` -> Olha pra package-lock.json, certificando q os pacotes q serão instalados são os que já funcionaram.

### Publicando um pacote

É necessário uma conta no NPM, visto que utilizaremos o login via CLI para enviar o pacote para o registro NPM.

O pacote que será disponibilizado precisa ter um index. Esse index é responsável por expor nosso pacote:

```javascript
import CodeToExpose from './src/codeToExpose.js'

export default CodeToExpose;
```

Dessa forma, não é necessário entrar na source. Apenas dando um require direto na index, já serve.

Dentro da configuração do pacote, podemos colocar o nome do usuário com um @ na frente, para determinar que será via escopo:

```json
{
	name: "@runageinc/testmodule",
	...
}
```

Agora, podemos utilizar o comando `npm publish --access=public`.

Para cada alteração, por padrão, é necessário trocar a versão a cada nova alteração.

Ao versionar, o ideal é seguir o padrão:

**major.minor.patch**

- patch → pequenos bugfixes ou alterações semânticas. 
- minor → novas features
- major → breaking changes

Depois, basta rodar o `npm publish` novamente que atualizará o pacote.

Um comando utilitário do NPM para controlar versionamento de forma automática é o `npm version <>` onde o incremento acontece por valor passado: minor, major ou patch

### Atualizações dos pacotes

Rodando o `npm outdated`, é possível ter o retorno de quais pacotes precisam de atualização.

Ao entendermos quais pacotes precisam atualizar, utilizando o comando `npm update` executará a atualização de todos os pacotes. Vale ressaltar que o install por si só não vai funcionar. Para atualizar as dependências, sempre tem de ser o update.

### semver (Semantic Versioning)

Um padrão criado pelo co-fundador do github, para resolver o dependency hell dos pacotes. Segue o padrão de major.minor.patch citado anteriormente.

Utilizando as dependências do NPM, existem algumas flags de segurança para impedir as alterações de versionamento de pacote: [semver calculator](https://semver.npmjs.com/)

### Github Packages

Aponta para o npm packages. Github comprou o NPM e por conta disso, o github consegue prover 500MB de graça para os pacotes.

Antes de iniciar, é preciso configurar um token na conta. Então em Settings > Developer Settings na conta Github, existe um trecho sobre tokens:

![[Pasted image 20250214082945.png]]

Após isso, basta criar um nome para essa key, e selecionar as permissões. No caso, de write e delete são essenciais:

![[Pasted image 20250214083051.png]]

Após selecionar as permissões, podemos gerar o token.

![[Pasted image 20250214083117.png]]
Token gerado: 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

Agora é necessário um repositório. Dentro de um repositório, há uma aba de packages. Antes de iniciar, precisamos no projeto json definir qual é o repositório:

```json
{
  "name": "03-npm-registry",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/RunageINC/test-package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

O mais importante desse package.json é a property **repository**. Ela define qual é o repositório que irá armazenar o pacote.

É necessário logar no npm com o Github packages:

`npm login --registry "https://npm.pkg.github.com"

E depois publicar esse pacote no mesmo lugar:

`npm publish --registry "https://npm.pkg.github.com"

Quando esse comando é executado, um publish é feito no github. Ao abrir os repositórios, é possível ver o pacote em questão com a tag do package: 

![[Screenshot 2025-02-14 at 08.36.54.png]]

![[Screenshot 2025-02-14 at 08.37.35.png]]
![[Pasted image 20250214083751.png]]

Uma maneira de automatizar esse processo todo é criando dentro do publish config do pacote uma configuração de qual registry vamos atualizar:

```json
//...
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
```

Biblioteca de referência que ajuda no registry control: [NPM RC](https://docs.npmjs.com/cli/v11/configuring-npm/npmrc)
