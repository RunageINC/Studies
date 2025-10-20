---

kanban-plugin: board

---

## Backlog

- [ ] [ FRONT ] - Explore characters page
	- [ ] How to unlock character
	- [ ] Possible decks + how to unlock
	- [ ] Cards on deck
	- [ ] Best decks against (that the user has registered)
	- [ ] Best decks against, recommended by the system
	- [ ] Add character context
- [ ] [ FRONT ] - Player/user page
	- [ ] Login
	- [ ] Decks
	- [ ] Track Progress
	- [ ] Dashes
	- [ ] Add player context
- [ ] [ UX ] - Redo all UX Pages
	- [ ] Packs page
	- [ ] Cards page
	- [ ] Main/Home page
	- [ ] Decks page
	- [ ] Characters Page
- [ ] [ INFRA ] - Create MySQL
	- [/] Tables
		- [x] Pack
		- [x] Card
		- [x] Card_Pack
		- [x] Game
		- [x] Game_Pack
		- [ ] Character
		- [ ] Game_Character
		- [ ] Player
		- [ ] Forbidden/limited list by game
	- [x] Docker
- [ ] [ BACK ] - Create Deck RESTful Endpoint
	- [ ] Entity - Document Mongo
	- [ ] Service
	- [ ] DTOs
	- [ ] Mappers
	- [ ] Repository
		- [ ] Find by id
		- [ ] Find by player
	- [ ] Controller
		- [ ] findByPlayer
		- [ ] findById
		- [ ] findAll
- [ ] [ BACK ] - Create Character RESTful Endpoint
	- [ ] Entity - SQL
	- [ ] Service
	- [ ] DTOs
	- [ ] Mappers
	- [ ] Repository
		- [ ] Find all
		- [ ] Find by id
		- [ ] Find by name
		- [ ] Find by game page
	- [ ] Controller
		- [ ] findByName
		- [ ] findByGamePage
		- [ ] findById
		- [ ] findAll
- [ ] [ BACK ] - Create Player/User RESTful Endpoint
	- [ ] Entity - SQL
	- [ ] Service
		- [ ] Login
	- [ ] DTOs
	- [ ] Mappers
	- [ ] Repository
		- [ ] Find all
		- [ ] Find by id
	- [ ] Controller
		- [ ] findByName
		- [ ] findByGamePage
		- [ ] findById
		- [ ] findAll
- [ ] [ INFRA ] - Create MongoDB
	- [ ] Document
		- [ ] Deck
	- [ ] Docker
- [ ] [ INFRA ] - Containers
	- [ ] MySQL
	- [ ] Mongo
	- [ ] Front - React Vite
		- [ ] Consider migrate to NextJS
	- [ ] Back - YGO TF 1 Deck Builder
	- [ ] OS for images + Node server
	- [ ] Proxy NGINX
- [ ] [ BACK ] - E2E test
- [ ] [ FRONT ] - E2E test
- [ ] [ BACK ] - Unit test
- [ ] [ FRONT ] - Unit test
- [ ] [ BACK ] - Integration test
- [ ] [ FRONT ] - Integration test
- [ ] [ BACK ] - Programmed tests by Apidog
- [ ] [ FRONT ] - Programmed tests by Apidog
- [ ] [ OBSERVABILITY ]
	- [ ] Grafana
	- [ ] Datadog or similar
	- [ ] Newrelic or similar
	- [ ] ELK stack
- [ ] [ DOCUMENTATION ]
	- [ ] Architecture
	- [ ] ERM
	- [ ] Documentation Mongo
	- [ ] Backend UML
	- [ ] React Blocks


## In Progress

- [ ] [ FRONT ] - Create Pack Page
	- [x] Create Pack Display card
		- [x] Img
		- [x] Pack metadata
			- [x] Name
			- [x] Cost
			- [x] Cards in Pack
			- [x] Cards per pack
			- [x] How to obtain
	- [x] Create card list display by pack
	- [ ] Add pack context
- [ ] [ BACK ] - Create Pack RESTful Endpoint
	- [x] Entity - SQL
	- [x] Service
	- [/] DTOs
	- [ ] Mappers
	- [ ] Repository
		- [ ] Find by name
		- [ ] Find by cost
		- [ ] Find by cards in
		- [ ] Find by game
	- [/] Controller
		- [x] findByName
		- [x] findAll
		- [ ] findByGame
		- [ ] findByCardsIn
		- [ ] findByCost
- [ ] [ FRONT ] - Create Card list Page
	- [x] Card list display
	- [x] Page numbers
	- [x] Search filters
		- [x] Filters selected
	- [x] Display detailed card info on click
	- [ ] Display forbidden/limited cards by game
	- [ ] Add card context
- [ ] [ BACK ] - Create Cards RESTful Endpoint
	- [x] Entity - SQL
	- [x] Service
	- [x] DTOs
		- [x] CardCreate
		- [x] CardFindOrUpdate
		- [x] CardSearchFilter
	- [ ] Mappers
	- [x] Specification
	- [/] Repository
		- [ ] Find Limited List
		- [x] Find by name or gamename
		- [ ] Find by filters
			- [ ] comparison filters: atk, def, level
			- [x] like filters: name, description, archetype, rarity, typeline, type, frame, race, atk, def, level, attribute
		- [ ] Find by pack
		- [ ] Find by game
		- [x] Find all paginated
	- [/] Controller
		- [x] findByName
		- [x] findAllPaginated
		- [ ] findByGame
		- [ ] findByCardsIn
		- [ ] findByDecksIn
		- [x] findByFilters
		- [ ] findLimitedList
- [ ] [ FRONT ] - Deck Build Page
	- [x] Existing decks menu + create new deck option 
	- [/] Create deck cover image upload/selector
		- [ ] Upload a new image
		- [x] Select image from existing cards
	- [x] Deck name component
	- [x] Deck card by type on deck display
	- [x] Number of cards by rarity
	- [x] Deck sections
		- [x] Main, Extra and Side
		- [x] Remove cards from each section by clicking on it
	- [/] Card searcher
		- [/] Add cards by drag'n'drop
			- Currently, they're added by clicking, not by draggin and dropping, meaning that side deck won't have any cards.
	- [x] Card detail displayer on hover
	- [x] Possibility of editing a deck by selecting it on main /deck page
	- [x] Add deck length for extra and side
	- [ ] Add better messages for deck save/update
	- [ ] Add recommended cards for building deck
		- [ ] By archetype
		- [ ] By theme
	- [ ] Add filters for recommended cards
	- [x] Add possibility to add more than 1 card of the same type and when remove, removing only that copy.
	- [x] Limit card to 3 copies of each
	- [ ] Inform on the menu that the deck has forbidden cards
	- [ ] Inform on the menu that the deck is incomplete or complete and how much % of the cards to reach completion (min 40, max 60)
	- [ ] Add deck context
- [ ] [ FRONT ] - Show limited/forbidden list by game


## Done





%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false,false]}
```
%%