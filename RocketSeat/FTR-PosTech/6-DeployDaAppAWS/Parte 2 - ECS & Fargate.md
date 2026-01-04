# Intro

Diferentemente do App Runner, que podemos acessar de maneira pública, vamos usar o ECS, onde o acesso externo não é tão simples.

Para trabalhar com o ECS, vamos precisar configurar uma VPC para acesso externo, e Subnets para subdividir esses ranges de IP's provenientes da VPC. A VPC por si só é privada, portanto vamos precisar fazer tabelas de roteamento (Route Tables) através de um Internet Gateway para receber tráfegos da internet externa.

Por fim, para organizar a escalabilidade, vamos ter que colocar um Load Balancer.

Dado o cenário de múltiplas réplicas para a aplicação, é necessário ter um load balancer para equilibrar esse tráfego. No caso, a AWS oferece um serviço chamado ALB que utiliza um algorítmo de Round Robin para balancear a carga de requisições entre todas as réplicas.

Além disso, as réplicas estarão embaixo de subnets, seccionadas através da nossa VPC. Essas subnets possuem IP's diferentes para cada réplica e o Load Balancer vai servir como ponto de acesso único para a aplicação independente de qual réplica será chamada.

## Criando um ECS

Seguindo os mesmos passos de todas as outras criações, um ECS é bem simples de se criar.

Para o ECS, podemos ter tanto Fargate quanto EC2. Nesse caso, vamos pela linha do Fargate.

Como boa prática, sempre terá a tag IAC = false

Quando um cluster é criado, podemos ver em Cloud Formation. Essa Cloud Formation é uma stack ferramental que mostra o estado de odos os eventos da AWS, sendo muito usado para os eventos mais complexos como por exemplo criar um ECS.

## Criando Task Definition

Após criado, vamos conhecer a Task Definition. Por padrão, precisamos de uma Task Definition simples pro ECS, com um nome simples. Essa task definition funciona muito similar a um contrato, um blueprint de como o ECS vai rodar o container.

Por hora podemos fazer tudo usando o padrão, com 1 vCPU e 2 GB de ram.

É necessário também uma role de task execution

Uma das coisas interessantes da Task Definition é a possibilidade de usar a Fault Injection, que é uma técnica da engenharia do caos para testar a resiliência dos serviços

Colocaremos o nome do container e a image URI para configurar essa task.

O Mapeamento de portas para o container deve ser especificamente igual ao que temos. No caso: 3333 (porta que roda o widget-server).

Necessário também colocar as env vars necessárias, e deixar o log como default por hora.

Podemos deixar o restante como default até porque a app é efêmera, sem estado.

Caso hajam mudanças de versão ou tag, precisamos criar uma nova revisão. Em teoria a cada novo deploy é necessário uma nova revisão.

## Associando a Task Definition ao Cluster

A Task agora de deploy com o Fargate precisa ser associada com a task defintion criada anteriormente.

Depois disso, temos outras configurações como apontar quantas réplicas teremos (escalabilidade horizontal), qual o deployment option sendo eles:

- Rolling update: vai cadenciar o deploy, fazendo um deploy de nova tag por réplica, por vez, para não derrubar tudo de uma vez e ter downtime.
- Blue/green: roda duas versões ao mesmo tempo mas uma não recebe tráfego, e a virada de tráfego é apontada.

Dentro de configuration também podemos fazer configurações de canary, linear, etc.

Há também uma porcentagem de tasks por deploy. Podemos ter um máximo e mínimo de réplicas por deploy.

Outra funcionalidade legal é o Failure detection, que funciona quase que como um smoke test, fazendo rollback caso detecte algum tipo de erro.
