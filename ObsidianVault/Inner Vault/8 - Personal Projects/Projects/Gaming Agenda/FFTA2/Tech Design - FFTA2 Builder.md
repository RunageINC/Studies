## Descrição

Projeto designado para ser um planner eletrônico somado a um centralizador de conhecimentos.

## Requisitos Funcionais

### DataSource - PostgreSQL

- O sistema deve promover uma centralização de informações sobre o jogo, como um grande banco de dados. Essa exploração de dados deve conter:
	- Personagens
	- Classes
	- Raças
	- Habilidades
		- Passives
		- Support
		- Reactions
	- Mapas
	- Missões
		- Main Story
		- Side Quest
	- Inimigos
		- Common
		- Boss
	- Items
		- Consumíveis
		- Equipamentos
			- Armas
				-   Edged Weapons
					- Knives
					- Swords
					- Blades
					- Sabers
					- Knightswords
					- Rapiers
					- Greatswords
					- Broadswords
					- Katana
					- Spears
					- Axes
				- Bludgeoning Weapons
					- Rods
					- Staves
					- Poles
					- Knuckles
					- Instruments
					- Hammers
					- Maces
					- Books
				- Ranged Weapons
					- Bows
					- Greatbows
					- Guns
					- Hand-cannons
					- Cards
			- Armaduras
				- Head
					- Helms
					- Hair adornments
					- Hats
				  - Armor
					  - Heavy armor
					  - Light armor
					  - Robes
				  - Shields
			- Acessórios
				- Shoes
				- Gloves
				- Accessories
	- Invocações
	- Clãs existentes
	- Statuses
### Planner Database - MongoDB

O sistema deve auxiliar na construção de composições de time e de builds para personagens específicos. Usuários com suas composições podem:

- Criar
- Editar
- Deletar
- Deixar notas
- Publicar
	- A publicação faz com que a composição apareça como sugestão para outros usuários do sistema. O estado de cada composição alternará entre:
		- <span style="padding: 4px 8px; background-color: green; border-radius: 200px; width: fit-content">Public</span>
		- <span style="padding: 4px 8px; background-color: gray; border-radius: 200px; width: fit-content">Private</span>
- O sistema deve promover simulações de cada time criado em missões ou contra um grupo de inimigos

O documento de uma build deve conter as seguintes características:

- ID - Concedido pelo mongoDB
- ID do jogador
- Nome do clã
- Notas do clã
- Banco de Personagens (até 24 personagens)
	- Objeto contendo:
		- ID - Gerado
		- Nome do Personagem
		- ID da raça do banco relacional
		- ID da classe do banco relacional
		- Level
		- Status
		- Slot 1 - Equip ID
		- Slot 2 - Equip ID
		- Slot 3 - Equip ID
		- Slot 4 - Equip ID
		- Slot 5 - Equip ID
		- Habilidade ativa 1 - ID
		- Habilidade ativa 2 - ID
		- Habilidade Reativa - ID
		- Habilidade Passiva - ID
		- Troféus MVP
- Comp de uso (até 6 personagens)
	- Objeto contendo:
		- ID da composição - Gerado
		- Nome da composição
		- Notas da composição
		- ID 1 - Mesmo do banco de personagens
		- ID 2 - Mesmo do banco de personagens
		- ID 3 - Mesmo do banco de personagens
		- ID 4 - Mesmo do banco de personagens
		- ID 5 - Mesmo do banco de personagens
		- ID 6 - Mesmo do banco de personagens
## Requisitos Técnicos

O fluxo principal está descrito no diagrama. Cada ponta do sistema irá utilizar um conjunto de tecnologias para exercer seu papel.

[[FFTA2 Builder Major Flow.excalidraw]]

- ##### FFTA2Builder DataSource API
	- PostgreSQL - Responsável pelos metadados do jogo.
	- NodeJS + TypeScript - Base tecnológica da API
	- Fastify Server + Fastify Swagger - Server e documentação
	- Zod - Validações
	- Drizzle ORM - Manuseamento do PostgreSQL
	- PostgresJS - Driver de comunicação do banco
	- TSUP - Build
	- Docker
- ##### FFTA2Builder Images Server
	- NodeJS + TypeScript - Base tecnológica da API
	- Fastify Server + Fastify Swagger - Server e documentação
	- Docker
- ##### FFTA2Builder Planner API
	- MongoDB - Banco de dados principal
	- Kotlin - Linguagem principal
		- Start with Java
		- Migrate to Kotlin after
	- Spring Boot - Funcionalidades
		- MongoDB Connection
		- Spring Security
	- Docker
- ##### FFTA2Builder Front End
	- React Router - Roteamento básico
	- React Query + Axios - Fetches com cache
	- Vite - Compilador
	- React TSX - React com TS
	- Shadcn - UI lib
	- Zod - Validador de tipos
- ##### Infraestrutura
	- Docker Compose - Orquestração

### Infraestrutura

Os projetos envolvidos estarão disponíveis com as seguintes especificações:

PostgreSQL
- Porta 5432
- v17 Alpine
FFTA2Builder Images Server
- Porta 3010
- Node v23 Alpine
FFTA2Builder DataSource API
- Porta 3333
- Node v23 Alpine
FFTA2Builder Front End
- Porta 5173
- Node v23 Alpine
FFTA2Builder Planner Database
- Porta 27017
- MongoDB 8.2.2
FFTA2Builder Planner
- Porta 8080
- Java 23
- Spring 3.0.0


## Questionamentos

- GraphQL no FFTA2Builder DataSource API?
- Admin para editar os itens?