# Intro

Nesse módulo iremos aprender um setup de IaC com Pulumi na AWS. Para iniciar, vamos garantir que o CLI esteja instalado:

`brew install pulumi/tap/pulumi`

Após isso, precisamos das keys da AWS: acesso e secret. Basta entrar na tab de security credentials da AWS para conseguirmos pegar os dados:

<img src="./sec-cred-aws.png">

Após isso, basta copiar suas keys e setar no seu computador. Depois disso, é necessário criar uma pasta vazia (chamaremos de quickstart), para configurar o projeto em Pulumi. Dentro da pasta, o comando:

`pulumi new aws-typescript`

Dentro da configuração, ao trabalhar com cloud, a boa prática é ter de 2 a 3 ambientes:

1 - Prod (PRD) _
2 - Staging (STG) _
3 - Homologação/Dev (HMG)

Os recursos de Staging não são utilizados em Prod. Com essa secção cada ambiente tem recursos próprios (seguindo o famoso Twelve Factor)

Nessa aplicação, utilizei a default de Virginia para a AWS (us-east-1), NPM e de ambiente STG.

Após isso, é criado um projeto novo em TypeScript com as configurações iniciais do Pulumi.

## Boilerplate

Dentro da estrutura do Pulumi, temos alguns arquivos importantes:

1. Pulumi.yaml

Como se fosse o package.json de projetos pulumi, com descrição, nome do projeto e options para subir. Tem também o package manager, tags, etc.

2. Pulumi.stg.yaml

Configuração específica para o ambiente de staging. Para outros ambientes, basta ter outros yamls similares. É possível inclusive mudar a região de apontamento

3. index.ts

Arquivo principal do Pulumi, cria os recursos e associa na cadeia de dependências do código.

Basicamente com esse código:

```typescript
import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("first-test");

// Export the name of the bucket
export const bucketId = bucket.id;
export const bucketArn = bucket.arn;
export const bucketName = bucket.bucket;
```

Podemos rodar o comando `pulumi up` e esperar a criação da infra. Todo comando vai gerar um output e também vai pedir para aceitar as atualizações feitas. É possível rodar o up com a flag `-y`, para aceitar automaticamente os updates.

O comando `pulumi destroy` também pode destruir a infra criada. Também aceita o `-y`.

A criação do bucket consegue comportar argumentos, que são bem úteis para garantir algumas coisas como nome e tags:

```typescript
const bucket = new aws.s3.Bucket("first-test", {
  bucket: "first-test-bucket",
  tags: {
    IAC: "true",
  },
});
```

A tag de IAC true garante que o gerenciamento aconteça somente por IAC, sendo qualquer outra alteração sendo perdida no futuro. Já a flag bucket vai trazer o nome da tag

## Criando outros recursos

Para criar outros recursos, basta adicionar novas linhas conforme o recurso desejado.

Ex: um novo recurso de ECR

```typescript
// Novo recurso

const ecr = new aws.ecr.Repository("first-test-ecr", {
  name: "first-test-ecr",
  imageTagMutability: "IMMUTABLE",
  tags: {
    IAC: "true",
  },
});

export const ecrName = ecr.name;
export const ecrRepositoryUrl = ecr.repositoryUrl;
```

Vale lembrar que os nomes dentro da property de `name` de cada recurso é único, portanto dois recursos com o mesmo nome não podem existir.

É possível automatizar para utilizar o github actions. A pasta do pulumi também pode estar dentro da app caso seja um grande monorepo.

## Pipeline

A cada commit no nosso repositório, o pulumi irá fazer uma alteração na infra.

Podemos setar nosso próprio workflow com um yml, que estará em `.github/workflows/main.yml`

Vale ressaltar que as secrets são necessárias pra esses steps no github
