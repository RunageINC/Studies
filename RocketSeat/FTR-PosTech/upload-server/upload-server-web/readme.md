# Sobre

Projeto criado através dos estudos da pós FTR da RocketSeat, com algumas alterações pessoais. Esse projeto foi feito em Node v23 e utiliza as seguintes dependências:

## Dev Deps

- Typescript
- Biome (linting)
- Vitest (testing)
- Dotenv (especificação de arquivo de teste para o Vitest)
- Drizzle Kit (verificação dos dados em banco)
- FakerJS (mantido pela comunidade, geração de dados de mock pra test)
- TSUP (build)

## Deps

- Fastify (server)
- Fastify Swagger (documentação)
- Fastify/Multipart (recebimento de arquivos multipart)
- Zod (typing e schemas)
- Drizzle ORM (db)
- PostgresJS (driver)
- UUIDv7 (id's únicos para o DB)
- AWS SDK Lib Storage & S3 (Cloudflare image bucket)
- DayJS (trabalhar com datas especialmente nos testes)
- CSV Stringify (construção de CSV para reports)

## Infra

- Postgres - v17-alpine para substituir as imagens da bitnami ensinadas no curso dado o problema com a bitnami removendo as imagens gratuitas
- Docker com Docker Compose - Banco de dados
- Cloudflare R2 - Armazenamento de imagens e reports
- Github Actions - Workflow de E2E para PR's no CI

# Step-by-step guide

As dependências instaladas foram:

`npm i -D typescript tsx @types/node @biomejs/biome vitest vite-tsconfig-paths dotenv-cli drizzle-kit @faker-js/faker tsup`

`npm i @fastify/cors fastify fastify-type-provider-zod zod @fastify/swagger @fastify/swagger-ui @fastify/multipart drizzle-orm postgres uuidv7 @aws-sdk/lib-storage @aws-sdk/client-s3 csv-stringify`

Após isso, foi executado um `npx tsx --init` e utilizando o tsconfig.json do repositório da microsoft relacionado com a versão do node utilizado no projeto. Esse arquivo pode ser encontrado no seguinte repositório:

[Microsoft TSConfigs](https://github.com/tsconfig/bases?tab=readme-ov-file)

Foram feitas algumas modificações nesse arquivo para refletir em como o projeto será gerenciado:

- Mudança da prop `moduleResolution` de `node16` para `bundler` e `module` para `ESNext` dado que ao publicar a app, ela será publicada como javascript através do bundling e não typescript. Também nos permite utilizar a feature de ECMAScript modules do node através do `"type": "module"` no nosso `package.json`.
- Adição de `paths` para facilitar as importações dentro do próprio projeto.

## Scripts

- npm run dev -> roda o tsx watch utilizando o servidor em fastify
- npm run test -> roda os testes com Vitest, auxiliado com o dotenv para utilizar o arquivo .env.test. Também executa através do `pretest` o migration de banco.
- npm run test:watch -> roda os testes com Vitest mas no modo watch, verificando alterações auxiliado com o dotenv para utilizar o arquivo .env.test. Também executa através do `pretest` o migration de banco.
- npm run db:generate -> lê os schemas e cria os migrations para o banco de dados.
- npm run db:migrate -> executa os schemas no banco de dados
- npm run db:studio -> Roda o drizzle kit studio
- npm run build -> Roda o build com o tsup

## DB

Para a aplicação, vamos utilizar o postgres como db. O projeto foi feito em cima da imagem da bitnami, mas dado as recentes notícias pré data desse desenvolvimento, a bitnami deu um prazo para remoção das imagens. Portanto, vou utilizar outra imagem de base. Estarei usando o `postgres:17-alpine` dado que é um projeto de estudos e não precisa de tanta segurança.

Utilizando da tag de `volumes`, podemos executar quantos scripts forem precisos ao subir o container. No caso, temos apenas o init.sql.

```yaml
volumes:
  - "./docker:/docker-entrypoint-initdb.d"
```

### ORM

No projeto, foi utilizado o drizzle-orm para manipulação dos dados em banco bem como o drizzle-kit para verificação dos mesmos. Sua vantagem em relação ao Prisma, que é mais comum, é justamente o fato de ser mais leve e mais rápido em runtime. O drizzle é quase um query builder então a sintaxe é muito próxima das queries tradicionais, diferente do prisma que faz com que a escrita pareça mais "mágica". Configurado através do arquivo `drizzle.config.ts`. A sintaxe de schema do Drizzle usa o próprio TypeScript. Esse ORM também tem uma estratégia de migration para controlar o versionamento do banco de dados.

A tabela de uploads vai conter o registro de cada upload com seu remote URL através do cloudflare. Isso porque as imagens que irão subir deverão ser públicas e portanto devem ter uma image url correspondente.

**uploads**
|column|type|description|
|------|----|-----------|
|id|uuidv7|ID único de banco|
|name|text|Nome do arquivo|
|remote_key|text|Chave de acesso única do arquivo no Cloudflare R2|
|remote_url|text|URL única de acesso do arquivo, público. Para os arquivos não públicos, não serão salvas URLs|
|createdAt|timestamp|Data de criação do arquivo com timezone|

O Timezone é importante para trabalhar com dados mais complexos e especificamente quando o software estiver em diferentes timezones. Vale ressaltar que timezones ocupam espaço no banco de dados, portanto é necessário ver se é realmente crucial ter esse dado armazenado. Remover o timezone depois de um software grande é um trabalho a mais.

Foi utilizado o UUIDv7, gerado através de uma lib dado que até o momento o node só suporta v4, para gerar os ID's com possibilidade de sorting.

Os schemas são exportados através de um barrel file, que nada mais é do que um arquivo de múltiplos exports. Esse arquivo é utilizado na interface de conexão com o banco, que se dá através do `index.ts` dentro da pasta db.

## Variáveis de ambiente com o Zod

Dentro de `src` há uma validação das variáveis de ambiente necessárias para rodar o projeto utilizando o zod. Essa é uma maneira muito prática de se fazer e garantir que o projeto tenha tudo que é necessário para rodar.

## Documentação com Swagger

Para documentar, foi registrado a lib `fastifySwagger`. Essa lib foi especificada com a OpenAPI, através do arquivo que separei chamado `docMetadata`. Cada rota passa uma spec através da propriedade `schema`. A documentação também possui um registro de UI chamado `fastifySwaggerUi` que pode ser acessada através da URL da app somada ao prefixo /docs.

Uma das alterações da configuração padrão é a utilização de um middleware (`transform-swagger-schema.ts`) para transformar o schema do open api, para que possa ser possível representar o `multipart/form-data`. Sem esse middleware, toda requisição abaca caindo dentro do `jsonSchemaTransform` e virando uma request que aceita somente JSON.

O middleware confere se o schema precisa consumir um tipo específico (no caso o _multipart/form-data_) e transforma o tipo do formato do corpo para binário.

## Testes com Vitest

Como ensinado nas aulas, foi utilizado o framework de testes vitest dado que possui mais velocidade por usar o ESM e esbuild para a compilação dos testes em relação ao jest. Também é necessário instalar a dependência `vite-tsconfig-paths` dado que estamos utliizando paths customizáveis no tsconfig e sem essa dependência o framework não consegue entender os alias. Para referenciar os testes com o Vite, foi criado o arquivo de configuração `vite.config.mjs`. Até o momento de desenvolvimento dessa app, o Vite não aceita .ts como extensão dos arquivos.

### upload-image.spec.ts

A funcionalidade de imagem de `app/functions/upload-image.ts` tem um grande acoplamento com banco e com o R2, portanto um teste unitário não é justificado. O principal a se fazer nessa rota seria ou um test E2E ou de integração. Por hora, como é um teste custoso por precisar de muitos recursos específicos como a própria disponibilidade tanto do banco quanto do R2, não é possível de testar a regra de negócio. Um exemplo é: se tivermos uma validação de 5 ou 6 regras de negócio que demora 200ms, pra 1 teste demoraria 1 segundo, o que não é uma boa prática.

Para isso a função que será testada será a partir de uma possível resposta do R2, o que deveria acontecer.

Para facilitar o teste, estou utilizando de um padrão de projeto chamado `Test Data Builder` que visa construir um objeto para fins de teste, possível de averiguar dentro de `tests/test-data-builder`.

O framework de testes possibilita antes de cada teste um mock da função do método de storage do R2.

### get-uploads.spec.ts

Testa o método de busca do banco de dados. Possui uma factory que faz inserção massiva de dados. Também possui uma maneira de, através do `InferInsertModel` combinado com o `Partial`, de sobrescrever qualquer dado do insert caso seja necessário.

Também possui uma maneira de limitar os uploads através do `randomUUID()` para deletar pós teste e não inflar o banco.

## Server com Fastify

Para gerar o server, foi utilizado o fastify. Essa lib é uma lib lightweight que cria um server de maneira rápida e intuitiva, assim como o express. Os componentes de cors, type provider, etc, são instalados separadamente.

Para validar e serializar os dados, foi usado o próprio compilador do zod.

Para CORS, também foi utilizado o módulo próprio chamado fastify cors.

Diferente do curso, optei por separar o error handler de validação do arquivo principal do servidor. Pra mim, faz mais sentido do ponto de vista organizacional separar as responsabilidades dessa forma. Até porque no handler, enviaremos os erros para alguma ferramenta de observabilidade.

O recebimento de arquivos de imagem foi feito com a lib `@fastify/multipart`, dado que o fastify por si só aceita apenas json. Com ele, é possível receber o arquivo utilizando apenas o `await request.file({})`, como demonstrado no código.

### Middlewares

#### Error Handling

Utiliza algo similar a um controller advice, intercepta os erros produzidos nas rotas e verifica se são erros de validação ou não

#### Transform Swagger Schema

Middleware para tratar a possibilidade do multipart/form-data dentro da documentação do swagger

### Auxiliares

Funções auxiliares que podem ser usadas não somente pelas rotas HTTP mas também por outras conexões que podem vir a acontecer no futuro com essa aplicação. Isso faz com que tudo seja validado novamente, por motivos de precaução.

#### upload-image.ts

Arquivo que trata o upload de imagens. Vale notar que foi utilizado o z.input ao invés de z.infer para criar o `UploadImageInput`. Isso porque o infer ou o output tratam o tipo do dado de saída. Se recebêssemos um dado do tipo string e transformássemos em number, para o infer/output o resultado seria number e não string. Mas não é o comportamento desejado dentro desse schema do zod, portanto foi utilizado o tipo input. O dado no caso é trabalhado dentro do método.

Vale ressaltar que não estamos utilizando o arquivo como Buffer e sim como ReadableStream. Isso previne com que a aplicação sofra de crash, de stack overflow, dado que estamos utilizando streams para trabalhar com as imagens. Garante escalabilidade e economia.

> Ao passarmos um Buffer, ele carrega a imagem inteira e aloca isso em memória, podendo causar altíssimo consumo. O ReadableStream permite com que, no momento em que o front envie a imagem, já estejamos processando a imagem para nosso servidor. Isso significa que, em memória, apenas pequenos pedaços da imagem são guardados e transportados para o R2 (por isso o nome multipart).

#### Either

Ao invés de lidarmos com erros da nossa própria aplicação no try/catch, foi utilizado um padrão chamado Either. Utilizando desse padrão, estamos evitando com que os try/catches capturem erros além da nossa aplicação, visto que a maioria das bibliotecas também utilizam do throw.

Esse padrão é existente no Go, Elixir e também existem libs para o Java para utilizarmos do Either com left/right. O método auxiliar de either usa a keyword `is` do TypeScript para determinar qual é o tipo do retorno, conseguindo realizar comparações com funções auxiliares `isLeft` e `isRight`

#### get-uploads.ts

Retorna, através de uma paginação opcional, os uploads realizados. Nota-se que ele retorna um Either de never, ou seja, impossível de dar erro. A paginação é baseada em offset e não em cursores, dado que essa paginação não será infinita para os uploads. Caso a quantidade cresca, o ideal é fazer com cursores.

#### export-uploads.ts

Função de exportação de uploads que retorna um reportUrl representando o arquivo csv de exportação. Em casos de longa espera de exportação, não podemos trancar o usuário na resposta do json. Nesse caso, podemos montar uma sessão no R2 na pasta de `downloads` por exemplo, para armazenar o report de exportação.

Quando lidamos com queries de exportação, pode ser que a query retorne **muitos** dados. Por exemplo, se vamos fazer um retorno de pessoas registradas em um evento, podemos facilmente ultrapassar os 150.000. Em média, na combinação de um nome e email, temos 35 bytes de dados. Esse número multiplicado pelo número de usuários, temos aproximadamente 5MB de dados para se retornar do banco. A maioria dos dados não são somente esse conjunto, e esse produto é multiplicado pelo número de usuários.

Dado isso, temos 2 funcionalidades na hora de exportar. No postgres, temos o comando `COPY`. Ele copia todos os dados para um CSV mas sem nenhum tipo de filtro. Geralmente para esses relatórios, esse tipo de feature não é utilizado. Para esses, o postgres possui uma feature de `CURSOR`, que funciona muito semelhante a uma stream do node, buscando dado a dado.

O Drizzle não possui suporte a `CURSOR` e portanto isso deve ser feito via driver nativo. Para isso, foi utilizado o método de `unsafe` passando uma query gerada pelo drizzle (para manter a sanitização, evitando injections).

Os dados são escritos via stream no csv, salvos no R2 de maneira incremental evitando com que os dados fiquem salvos em memória. Usando a lib [CSV Stringify](https://csv.js.org/), vamos gerar o CSV com os respectivos headers.

Para processar os arquivos, vamos utilizar o `pipeline` do Node, que aceita um `Iterable` (justamente o retorno do cursor do postgres) e trabalharemos em cima desses dados.

Aplicar o contentStream dentro do upload não é muito simples dado a natureza da `pipeline`. A maneira que foi utilizada para passar o conteúdo para o upload foi através do uso de um `PassThrough` stream. Após isso, esperamos através do Promise.all a finalização tanto da pipe quanto do upload. É importante não usar await na pipeline dado que queremos escrever em tempo real.

Importante ressaltar que para não haver duplicação dos dados, a pipe recebe um transform logo após o cursor que faz com que não existam registros duplicados, através do `objectMode` que funciona basicamente como um stringify, retornando um array.

### Routes

#### Uploads

Rotas de upload de imagens. A rota de inserção recebe um `multipart/form-data` com limite de 2MB e faz a inserção tanto no CloudFlare R2 quanto no banco. Essa rota chama o método auxiliar de uploadImage do arquivo `upload-image.ts` para fazer o stream dos dados. Para evitar que um arquivo pare no meio, há um tratamento além do Cloudflare, com o check através de `uploadedFile.file.truncated`, que basicamente verifica se o arquivo foi truncado por ser grande demais.

A rota de busca retorna a listagem de uploads paginada. A paginação é opcional e apenas ajuda a filtrar melhor os dados do banco.

## Storage com Cloudflare

O armazenamento das imagens foi feito utilizando o R2 da Cloudflare, e as bibliotecas da AWS para conexão com o S3, visto que são compatíveis e recomendados pela própria empresa.

### client.ts

Toda a configuração foi feita para que a conexão com o R2 seja estabelecido, usando os dados da conta criados. Algumas variáveis estão sobrando no env.example, mas melhor sobrar do que faltar :)

### upload-file-to-storage.ts

Cria um arquivo de nome único para armazenar no R2 utilizando o Upload do libstorage da AWS. Esse método sanitiza o nome do arquivo e retorna a chave sendo o nome do arquivo somado a um UUIDv7 e também uma URL pública.

Utiliza-se de um folder também para que seja possível criar lifecycle rules dentro do storage, marcando ao arquivo que estiver na pasta de downloads um TTL.

## Github Actions - Workflow de CI

Foi criado um Workflow de CI de testes para cada pull request aberto para esse projeto. Esse workflow é executado dentro do Ubuntu, basicamente utilizando os serviços que precisamos como o postgres.

Após isso, ele baixa o código e faz setup do npm. No curso foi usado o pnpm com node v20 e os runs foram `pnpm install --frozen-lockfile` e `pnpm run test`. Para esse projeto, como estou fazendo com npm puro, deixei com o v23 e usei os equivalentes do --frozen-lockfile (`npm ci`) e `npm run test`. O comando de ci/--frozen-lockfile basicamente garante que as instalações não gerem outro package-lock.json, podendo bagunçar os arquivos de dependência já existentes no projeto.

Após isso, na aba de Github Actions é possível ver a execução do CI.

## Configuração de Build

Para otimizar a build, foi utilizado o `tsup` que utiliza o ES Build por debaixo dos panos, sendo um processo bem rápido. O processo de build ajuda a deixar o código menor e com menos coisas desnecessárias para a distribuição. A configuração foi feita através do arquivo `tsup.config.ts`. Fora a configuração padrão, uma configuração que vale mencionar é a propriedade `clean` que limpa o diretório de build (definido como dist através do `outDir`) que limpa o diretório de build antes de buildar novamente.

## Rodando o projeto:

É necessário criar um arquivo `.env` com as variáveis com o mesmo nome das presentes no arquivo `.env.example`. Na pasta raiz, rode os seguintes comandos:

`docker-compose up`
`npm run dev`

Para os testes, basta rodar `npm run test`.
