
Ferramenta de orquestração para executar e gerenciar múltiplos containers. Geralmente utilizado somente em ambiente local (de desenvolvimento), sendo que utilizar em ambientes produtivos não é uma boa prática.

Essa ferramenta é instalada de tabela quando estamos instalando o [[Docker]], sendo que sua execução se dá por meio de um arquivo chamado `docker-compose.yaml`. Podemos ter outros nomes de docker-compose, mas devemos utilizar de inferência caso mudemos os nomes.

A execução dos containers através do docker compose é bem simples, apenas executando `docker compose up` para subir os arquivos.

Ele é responsável por gerenciar quais containers irão ser executados e buildados, garantindo também a criação de volumes para manter um nível de estado entre as execuções de containers.

A ferramenta também é responsável por criar e gerenciar networks, responsáveis por conectar os containers em um único contexto de rede, dado que os containers individualmente não reconhecem as existências uns dos outros.

Um ponto importante é que o docker-compose não considera ordem de execução, sendo todos os containers executados de maneira assíncrona. Isso pode causar problemas caso um container dependa do outro para executar.