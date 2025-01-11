
### Character

- ID
- Name
- Race ID
- Gender (MALE | FEMALE)
- Starting Job ID
- Exclusive Jobs
- Location
- Game Appearance
- How to Unlock
- Lore
- Img Url

### Clan

- ID
- Name
- Negotiation (0 ~ 99)
- Aptitude (0 ~ 99)
- Teamwork (0 ~ 99)
- Adaptability (0 ~ 99)
- Lore

### Character Builder (FFTA2)

- ID (UUID)
- Name
- Race ID
- Gender (MALE | FEMALE)
- User ID (owner)
- Ability 1
- Ability 2
- Reaction Ability
- Passive Ability
- Lore
- Slot 1
- Slot 2
- Slot 3
- Slot 4
- Slot 5

### Race Definitions

- ID
- Name
- Lore
- Location
- Game Appearance
- Is Flying Unit?
- Img Url

### Race_Jobs Definitions

- ID
- Race ID
- Job ID

### Job Definitions

- ID
- Job Name
- Required Job Id
- Lore
- Stats
	- Move (0 ~ 999)
	- Jump (0 ~ 999)
	- Evasion (0 ~ 999)
	- Unarmed Attack Raise (0 ~ 999)
	- Resilience (0 ~ 999)
	- HP (from A to H)
	- MP (from A to H)
	- ATK (from A to H)
	- DEF (from A to H)
	- MGK (from A to H)
	- RES (from A to H)
	- SPD (from A to H)
- Equippable Weapons
- Equippable Armors
- Skills
- Img Url
- How to Unlock
- Game Appearance

### Location Definitions

- ID
- Name
- Region
- Game Appearance
- Lore
- Recrutable Races

### Battle Map Definitions

- ID
- Name
- Location ID
- Lore
- Image URL

### Job_Ability Definitions

- ID
- Job ID
- Ability Type ID

### Ability Type Definitions

- ID
- Name
- Type ( Command | Reaction | Passive )

### Skill Definitions

- ID
- Name
- Learning method
- Ability Type ID
- Lore
- Element ( FIRE, WATER, ICE, THUNDER, AIR, EARTH, LIGHT, DARK, NEUTRAL )
- Status ID
- Description
- Range
- AP
- MP
- Game Appearence
- Image URL

### Equipment Definitions

- ID
- Name
- Type
- Element
- Item category
- Bazaar Category
- Price
- Atk
- Def
- Mag
- Res
- Eva
- Spd
- Extra Effect 
- Range
- Job Skill 
- Skill AP
- Alternative Source
- Description
- Lore
- Game Appearance
- Image URL

### Quest Definitions

- ID
- Name
- Type
- Rank
- Fee
- Days
- Items
- Aptitude
- Teamwork
- Adaptability
- Lore
- Location
- Description
- Recommended Jobs
- Game Appearence
- Can Dispatch
- Can Cancel
- Can Repeat

### Item Definition

- ID
- Name
- Price
- Image Url
- Effect
- Description

### Loot Definition

- ID
- Name
- Price
- Image URL
- Description

### Craft Definition

- ID
- Equipment ID
- Loot ID

### Reward Definition

- ID
- Quest ID
- Item ID
- Loot ID
- Gil
- Equipment ID
- Game Appearance

### Status Definition

- ID
- Name
- Description
- Game Appearance

### Monster Definition

- ID
- Name
- Description
- Is Undead?
- Weaknesses (comma separated elements)
- Half Damage Received (comma separated elements)
- Null Damage Received (comma separated elements)
- Absorbed Damage (comma separated elements)
- Lore
- Race
- Image url
- Move
- Jump
- Evasion
- Resilience

### Monster_Skill Definition

- ID
- Monster ID
- Skill ID

