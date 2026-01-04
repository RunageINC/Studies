# Docker Compose

Quando estamos colocando uma aplicação containerizada para rodar, temos que subir obviamente todos os containers necessários como containers para banco de dados, etc.

Porém não é tão trivial apenas subir os containers e conectá-los às aplicações dado que cada container está em um ambiente isolado.

O acesso de cada container é feito de forma individualizada, significando que o localhost de um container está somente embutido dentro de seu próprio espaço. Como o container foi feito para ser lightweight, nós não podemos subir muitos serviços dentro dele.

Se algum problema acontecer no container do banco, mesmo que faça parte do contexto da aplicação, o container isolado não possui nenhum tipo de controle tornando extremamente difícil realizar um debug ou uma correção de qualquer problema.

Existem ferramentas para orquestração local e também em cloud. Localmente o `docker compose` é o mais famoso para rodar multi-containers, criar e gerenciar redes para que os containers consigam se comunicar (resolvendo um dos problemas citados acima), ter um controle maior do ecossistema como um todo ao invés de um controle individualizado por container, etc.

## Docker Compose

Um orquestrador para ambiente local, não é utilizado fora desse ambiente e se utilizado não é considerado uma boa prática.

Para o ambiente local essa ferramenta é uma grande facilitadora de orquestração do container dado que eliminamos algumas etapas de execução dos containers como o build.

Os arquivos de compose funcionam com o padrão `yaml`, e geralmente apenas por conter o nome `docker-compose` já podemos executá-lo como uma espécie de index para a aplicação containerizada. Caso desejemos utilizar outros nomes para o arquivo de compose, basta inferir qual o nome do arquivo que será utilizado como base de orquestração.

O docker já nos presenteia de brinde o docker-compose, não sendo necessário quaisquer instalações adicionais.

A primeira definição dentro do docker-compose pode ser feito rapidamente levando em conta quais foram os comandos utilizados para rodar a aplicação.

O comando de build e run é praticamente o mesmo do docker simples:

`docker-compose up --build -d`

Sendo o -d também o modo dettach.

A criação de estados para cada container é feita através da sintaxe do yaml de `volume`. Essa sintaxe permite com que alterações sejam salvas, transformando o container de um container efêmero para um container _stateful_.

```yaml
services:
  db-postgres:
    image: postgres:17-alpine
    container_name: upload-server-db-postgres
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=root
      - POSTGRES_DB=upload-server-web
    volumes:
      - db-postgres:/var/lib/postgresql/data
```

> O caminho /postgresql/data é específico de bancos postgres. Caso seja necessário utilizar outro banco, será necessário também consultar as opções de volume para ele.

Par que esse comando funcione, é necessário na raiz do arquivo yaml criar um serviço de volume equivalente, sendo que essas informações de estado são salvas no HD do computador. Se o volume for deletado do computador, o container perderá o estado.

```yaml
volumes:
  db-postgres:
```

Ainda é possível utilizar volumes com docker comum, bastando utilizar a tag `-v` ao subir um container:

`docker volume create db-postgres`

Caso o controle seja feita de maneira externa ao docker compose, pode-se usar da flag `external: true` para isso. Isso faz com que o docker-compose entenda que o volume foi gerado de maneira externa:

```yaml
volumes:
  db-postgres:
    external: true
```

Os volumes podem ser listados com `docker volume ls` e também podem ser inspecionados com o `docker inspect <nome do volume>`

### Network

Podemos fazer uma rede que faz com que os containers consigam se enxergar de maneira mais isolada. Containers só enxergam outros containers que pertencem ao mesmo network.

Os comandos de inspeção de volume e criação também valem para o network, tanto o inspect quanto o ls e create. Para passar via docker comum, usamos o -n

O driver default de networks é o bridge mas podemos inferir outros tipos.

Uma boa prática entre os containers é utilizar da tag `depends_on`. Essa tag diz se um serviço depende de outro para subir, mas é importante salientar que essa flag não olha se o serviço está funcionando, apenas cria uma dependência

```yaml
services:
  db-postgres:
    ...

  upload-server-web:
    build: ./dev-build
    depends_on:
      - db-postgres
    ...
```

Existem 2 ferramentas que podem ajudar a checar a garantia de funcionamento de um container: `wait-for-it` e `dockerize` que performam health checks nos containers

### Variáveis de ambiente

Para executar as variáveis de ambiente basta utilizar `${NOME_DA_VARIÁVEL}` ao construir o docker-compose.

Pode-se também ter um controle maior sobre as ações do container com o compose caso alguma coisa aconteça ao container. Podemos utilizar por exemplo o `restart` para definir um comportamento de reset:

- `restart: always` - Sempre restarta o componente no erro.
- `restart: on-failure` - na falha
- `restart: unless-stopped` - continua tentando até manualmente ser interrompido

Outro controle é o controle de `platform`, que define a arquitetura do container, utilizado caso haja problema ao rodar um container:

```yaml
services:
  db-postgres:
    image: postgres:17-alpine
    container_name: upload-server-db-postgres
    restart: unless-stopped
    platform: linux/amd64
```
