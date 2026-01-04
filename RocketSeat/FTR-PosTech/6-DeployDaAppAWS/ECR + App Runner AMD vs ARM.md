# Problemas entre AMD e ARM ao usar ECR + App Runner

Quando as pessoas falam sobre **"problemas entre AMD e ARM ao usar ECR +
App Runner"**, na prática estão falando sobre **incompatibilidade de
arquitetura de CPU em imagens Docker**.

Este é um dos problemas mais comuns (e confusos) ao usar containers na
AWS.

------------------------------------------------------------------------

## O problema central (resumo rápido)

**O App Runner roda em ARM (Graviton), mas sua imagem Docker foi
construída para AMD/x86.**

O ECR aceita qualquer imagem.\
O App Runner tenta rodar a imagem.\
Mas **ARM não consegue executar binários AMD/x86**.

Resultado: falha em tempo de execução.

------------------------------------------------------------------------

## Arquiteturas envolvidas

### AMD / x86_64

-   Também chamada de: `amd64`, `x86_64`
-   Usada na maioria dos laptops e runners de CI
-   Arquitetura padrão quando você executa:

``` bash
docker build .
```

------------------------------------------------------------------------

### ARM / arm64

-   Usada pelos processadores **AWS Graviton**
-   O App Runner **usa ARM por padrão**
-   Mais barato e eficiente para a AWS

------------------------------------------------------------------------

## O que o ECR faz (ponto importante)

**O ECR NÃO valida compatibilidade de arquitetura.**

Ele pode armazenar: - `linux/amd64` - `linux/arm64` - Imagens multi‑arch

O ECR é apenas armazenamento 📦

------------------------------------------------------------------------

## O que o App Runner faz (onde o problema acontece)

-   O App Runner executa containers em **ARM (linux/arm64)**
-   Se a imagem for **apenas amd64**:
    -   A imagem é baixada normalmente
    -   O container tenta iniciar
    -   Falha em runtime

### Erros comuns

Dependendo da linguagem:

-   **Node / Go / Rust**

```{=html}
<!-- -->
```
    exec format error

-   **Java**

```{=html}
<!-- -->
```
    cannot execute binary file

-   **Python com dependências nativas**

```{=html}
<!-- -->
```
    wrong ELF class / wrong architecture

Esses erros aparecem **após o deploy**, o que dificulta o debug.

------------------------------------------------------------------------

## Por que isso acontece com tanta frequência

### 1. Build local gera amd64 por padrão

A maioria dos computadores e CIs são x86:

``` bash
docker build -t minha-app .
```

Isso gera:

    linux/amd64

Funciona localmente, sobe para o ECR, mas quebra no App Runner.

------------------------------------------------------------------------

### 2. Dependências nativas agravam o problema

Mesmo linguagens interpretadas podem falhar:

-   Wheels Python
-   Addons nativos do Node
-   JNI no Java
-   Pacotes do sistema (`apt`, `apk`)

Se foram compilados para amd64, o ARM não consegue executar.

------------------------------------------------------------------------

## Padrões comuns de falha

### ❌ Padrão 1: imagem somente amd64

    Imagem: linux/amd64
    App Runner: linux/arm64
    → 💥 Falha

------------------------------------------------------------------------

### ❌ Padrão 2: imagem base incompatível

``` dockerfile
FROM node:18
```

Se a imagem base for amd64, todo o container será amd64.

------------------------------------------------------------------------

### ❌ Padrão 3: build nativo no Dockerfile

``` dockerfile
RUN npm install
RUN pip install psycopg2
RUN go build
```

Esses comandos compilam binários para a arquitetura do build.

------------------------------------------------------------------------

## Soluções corretas

### ✅ Solução 1: Build explícito para ARM (recomendado)

``` bash
docker buildx build   --platform linux/arm64   -t minha-app   --push .
```

Ideal se você só usa App Runner.

------------------------------------------------------------------------

### ✅ Solução 2: Imagem multi‑arquitetura (melhor prática)

``` bash
docker buildx build   --platform linux/amd64,linux/arm64   -t minha-app   --push .
```

Cria um manifest list: - App Runner usa arm64 - EC2/local usam amd64

⭐ Melhor abordagem

------------------------------------------------------------------------

### ✅ Solução 3: Forçar App Runner em x86

Possível em alguns casos, mas: - Mais caro - Perde vantagens do
Graviton - Nem sempre disponível

Use apenas se ARM não for viável.

------------------------------------------------------------------------

## Como verificar a arquitetura da imagem

``` bash
docker manifest inspect <imagem>
```

Procure por:

``` json
"architecture": "arm64"
```

ou

``` json
"architecture": "amd64"
```

------------------------------------------------------------------------

## Modelo mental para lembrar

-   **ECR** = armazenamento neutro
-   **App Runner** = compute ARM
-   **Docker** = builds dependem da CPU
-   **Build deve bater com runtime**

------------------------------------------------------------------------

## Resumo

  Componente   Responsabilidade
  ------------ -------------------------------
  ECR          Armazena imagens
  App Runner   Executa containers ARM
  Docker       Gera binários por arquitetura
  Problema     amd64 em runtime arm64
  Solução      arm64 ou multi‑arch
