
#TypeScript

## História

Nasceu como um superset pela Microsoft, um conjunto de ferramentas em cima do javascript para adicionar a [[Tipagem estática]] em cima de uma linguagem de [[Tipagem dinâmica]].

Uma das possibilidades da tipagem estática dentro do TypeScript é a utilização de interfaces para definir quais serão os tipos de um elemento:

```typescript
interface Post {
    id: number;
    title: string;
    content: PostContent[];
    publishedAt: Date;
    author: PostAuthor;
}
```

Em JavaScript convencional, seria possível enviar um `publishedAt` do tipo number ou boolean, e só seria possível descobrir o erro em tempo de execução. 

Essas interfaces ajudam não somente a tipar as variáveis mas também a descobrir erros antes mesmo de executar o programa, em tempo de desenvolvimento. Esse tipo de tipagem também ajuda a IDE a auto-completar e fornecer assistência correta sobre métodos e classes de acordo com seus tipos respectivos e retornos esperados. O feedback de erros é instantâneo.

Interfaces também podem ser estendidas para agregar comportamentos de outras interfaces.

Uma outra particularidade do TypeScript é o uso do tipo de arquivo `.d.ts` que permite com que seja criado um arquivo de definição de tipos. Esse arquivo não pode conter códigos javascript, somente tipagem.

## Tipagem

Além dos primitivos comuns como `string`, `boolean` e `number`, o TypeScript também determina alguns tipos novos de sua própria linguagem:

#### any 

Por padrão, qualquer variável/constante criada sem definição explícita de tipo é `any`:

```typescript
let message: any; //explicitamente definindo o tipo any
let message2; // infere que o tipo é any, dado que nenhum tipo foi explicitamente definido e nenhum valor atribuído.
```

Esse tipo é um tipo "coringa", que aceita qualquer tipo de valor, similar ao comportamento padrão do javascript comum. O tipo any permite com que burlemos a verificação de conteúdo de variável padrão, embutido no TypeScript. Vale ressaltar que o tipo any é altamente desencorajado por frameworks, dado que inclusive é uma rule do ES Lint.

Esse tipo é usado quando não temos certeza de qual é o tipo específico de uma variável.

#### Array typing

É possível fazer uma tipagem em arrays. Essa tipagem pré determina qual vai ser o aceitável para um array de elementos: 

```typescript
let names: string[] = ["john", "doe"]
```

Array typing também é possível de ser definido através da inferência de tipos.

#### Function typing

O TypeScript possibilita tipagem na assinatura do método e também no retorno, evitando erros em tempo de desenvolvimento:

```typescript
function sum(x: number, y: number): number {
	const result = x + y;
	
	return result;
}

const result = sum(7, 3);
```

#### Object typing

É possível tipar objetos complexos, tratando cada atributo como um tipo diferente.

```typescript
const user: { name: string, age: number } = { name: "John", age: 23 }
```

Propriedades em métodos e objetos podem ser opcionais, utilizado a interrogação na frente da propriedade:

```typescript
const user: { name: string, age: number, avatarUrl?: string } = { name: "John", age: 23 } // Torna a variável avatarUrl como string | undefined
```

Ao tipar assinaturas de funções, podemos também passar objetos de duas formas. Tanto de maneira estruturada quatno de maneira desestruturada:

```typescript
// Estruturado
function passAnObj(user: { name: string, age: number }) {}

// Desestruturado
function passAnObj({ name, age }: { name: string, age: number }){}
```

#### Undefined e Null

As variáveis do tipo undefined aparecem quando não temos um valor atribuído a uma variável: 

```typescript
let value: number;

console.log(value); // Vai produzir undefined
```

Undefined também pode ocorrer ao tentar acessar uma propriedade de um objeto que não existe:

```typescript
const user = { name: "John" }

console.log(user.email) // Também retorna undefined
```

O exemplo acima é executável e compilável (embora em tempo de desenvolvimento o TypeScript nos diga que o valor é undefined por não existir) e produzirá um undefined

Já o null indica uma ausência intencional de valor. Esse tipo também se encaixa como um tipo primitivo e geralmente é definido de forma explícita de que uma variável não possui um valor:

```typescript
let email = null;

console.log(email) // Não atira um erro, mas retorna um valor null.

// Outros casos:

if (!email) { console.log("Nenhum email informado!"); }
```

#### Union typing

Existem cenários onde o valor pode ter mais de um tipo. Vendo os valores possíveis acima, já nos foi informado um cenário onde isso pode ocorrer: quando tentamos informar que um objeto possui uma propriedade que pode ser nula. Isso faz com que o TypeScript nos mostre duas possibilidades de valor: `string | undefined` por exemplo:

```typescript
// Supondo uma call de api...
const response: string | null = restCall.get();
```

Dessa forma, o union faz com que o response possa assumir mais de um tipo de valor. Se adicionássemos mais tipos ali, como number ou boolean por exemplo, a atribuição desses valores nessa variável não geraria um erro.
### Tipagem explícita e Inferência de tipos:

A tipagem explícita, como o próprio nome diz, pressupõe que o tipo da variável é claro desde o momento de sua declaração:

```typescript
let name: string

name = 1; // Vai dar um erro em tempo de desenvolvimento, visto que estamos explicitamente deixando claro que o nome só aceita tipo string.
```

Já a inferência dos tipos acontece quando o TypeScript deduz o tipo da variável no momento da criação:

```typescript
let message = "Hello World!" //O TypeScript infere que o tipo é string, apesar de não estar explicitamente declarado.
```

### Tipos personalizados

#### Interface

É possível criar um tipo personalizado através de uma interface:

```typescript
interface Product {
	name: string;
	value: number;
	createdAt: Date;
}

const newProduct = (product: Product) => {
	// do something...
}

newProduct({ name: "Produto1", value: 20.05, createdAt: new Date() });
```

Como uma boa prática para o TypeScript, é correto identificar as interfaces com camel case, sendo a primeira letra maiúscula.

Essas interfaces podem ser estendidas também para garantir as propriedades da programação orientada a objetos quando se trata de herança:

```typescript
interface Person {
	name: string;
	age: number;
}

interface Subject {
	name: string;
	durationInDays: number;
	hoursPerDay: number;
}

interface Teacher extends Person {
	subjects: Subject[]
}

interface Student extends Person {}
```

#### Type

Também conhecido como type alias, é uma keyword para criar tipagens customizadas assim como a interface. Segue as mesmas regras de boa prática da interface: 

```typescript
type Product = {
	name: string;
	value: number;
	createdAt: Date;
}

const newProduct = (product: Product) => {
	// do something...
}

newProduct({ name: "Produto1", value: 20.05, createdAt: new Date() });
```

Os tipos não podem herdar de outros tipos como a interface. Ao invés disso, é possível fazer uma intersecção entre tipos. Essa intersecção é feita através da utilização do caractere `&` agregando o outro tipo que estamos querendo fazer a intersecção:

```typescript
type Person = {
	id: number;
	name: string;
}

type Subjects = {
	name: string;
	durationInDays: number;
	hoursPerDay: number;
}

type Teacher = Person & {
	subjects: Subjects[]
}

type Student = Person & { joinedAt: Date; }
```

##### Type vs Interface

Ambas as maneiras podem ser utilizadas para criar uma tipagem customizada para nossos propósitos. As diferenças entre as duas, além da declaração e reutilização/extensão de outros do mesmo modelo, são:

- Interfaces podem ser sobrescritas, enquanto tipos não:

```typescript
interface Product { 
	name: string;
}

interface Product {
	value: number
}
```

No caso acima, as interfaces são unidas e agora o tipo Product possui `name` e `value` como propriedades obrigatórias. Isso não é permitido quando estamos utilizando o `type` como tipagem, já que esse tipo de duplicação não pode ocorrer em tempo de compilação.

- Type permite a utilização de tipos primitivos para a criação de tipos customizados, diferente de interfaces: 

```typescript
type TypeString = string; 
type TypeNumber = number;

// Cria um alias a partir de um tipo primitivo. Isso não é possível com interfaces

interface INumber extends number {} // Isso não é possível pois interfaces não podem estender tipos primitivos.
```

#### Asserção de tipos

Muito útil quando o TypeScript não sabe qual o tipo que será retornado. Um bom caso de uso para a asserção de tipos é no consumo de API's. Às vezes, o retorno de uma API pode ser desconhecido pelo TypeScript. Isso pode fazer com que a IDE pode se perder e o auto-completar não consegue cumprir seu papel:

```typescript
type UserResponse = {
	id: number;
	name: string;
	avatar: string;
}

let userResponse = {} as UserResponse
```

A utilização da keyword `as` pode ser utilizada para dizer como aquela variável poderá ser tratada. Podemos tanto utilizar para fazer uma conversão de tipos quanto para informar ao TypeScript qual o tipo daquele objeto/variável.

#### Restrição de valores

Podemos utilizar também o type para restringir quais os possíveis valores de uma variável. Esse tipo de comportamento é muito comum em bibliotecas de UI/UX que predeterminam algum comportamento de algum componente como por exemplo tipo de botão, tamanho de letra, etc:

```typescript
type Button = {
	variant: "primary" | "secondary" | "destructive";
}
```

Se tentarmos atribuir ao botão uma variante que não está dentro dos parâmetros permitidos, teremos um erro em tempo de desenvolvimento avisado pela IDE.

#### Enums

Enum é um recurso de programação presente em diversas linguagens como Java, C# e também no TypeScript. Esse recurso auxilia na criação de constantes muito semelhante à restrição de valores, mas de forma padronizada para que possamos utilizar em outros locais:

```typescript
enum Profile {
	ADMIN = 1,
	CLIENT = 2,
	SELLER = 3
}

let profile: number = Profile.ADMIN;
```

Em um cenário onde em uma API os profiles são definidos por números, normalizar isso em código pode ser complicado. Utilizando os enums, diferente de somente uma restrição de valores, podemos padronizar com nomes promovendo um maior sentido para cada cenário dentro do código.

#### Generic

Podemos tornar a tipagem do TypeScript mais flexível do que ela é. Para isso, o uso de Generics é imprescindível, fazendo com que possamos dinamicamente definir qual o tipo de cada variável:

```typescript
function useState<T>() {
	let state: T;
	
	function get(): T {
		return state;
	}
	
	function set(newValue: T): void {
		state = newValue;
	}
	
	return { get, set }
}

let newState = useState();

newState.get();
newState.set("SP")
```

Utilizando os sinais de < e >, podemos definir qual vai ser o tipo. Existem algumas convenções para se utilizar em generics, dado que a letra dentro dos símbolos pode ser qualquer uma:

- S para state
- T para type
- K para key
- V para value
- E para element

Sem definição de um tipo, o comum para ele é o tipo `unknown`. Mas podemos tipar da mesma forma que fizemos para tornar o tipo genérico:

```typescript
let newState = useState<string>(); // Define que o T será string.
```

Podemos também modificar o comportamento de atribuição de `unknown`. Para fazer isso, podemos estender nosso tipo genérico para outro tipo:

```typescript
function useState<T extends number | string = string>(){}
```

Dessa forma, além de restringirmos os tipos apenas para number e string, também definimos o default para ser string.

### Utilitários do TypeScript

#### Partial

Muito utilizado para utilizarmos parcialmente uma atribuição de valor, quando não temos nenhum atributo opcional para uma propriedade mas também não temos como informar todos os valores. Usado por exemplo em casos de update

```typescript
interface User {
	id: number,
	name: string,
	email: string
}

const newUser: User = { id: 1, name: "John" }

const updatedUser: Partial<User> = { name: "Jane" } // Por usar o Partial, podemos pegar apenas algumas propriedades para preencher.
```

#### Pick

Utilizado para reaproveitar apenas alguns atributos de algum tipo:

```typescript
interface Book {
	title: string,
	pages: number,
	releasedAt: Date,
	author: string
}

const book: Pick<Book, "title" | "pages"> = { title: "Typescript", pages: 100 }
```

As propriedades que queremos reaproveitar nessa nossa variável são separadas pela pipe `|`, fazendo com que possamos escolher somente as propriedades que queremos nesse tipo.

#### Omit 

Similar ao Pick, mas ao invés de escolhermos quais queremos aproveitar, escolheremos quais queremos omitir do novo tipo:

```typescript
interface Book {
	title: string,
	pages: number,
	releasedAt: Date,
	author: string
}

const book: Omit<Book, "author" | "releasedAt"> = { title: "Typescript", pages: 100 }
```

#### Record

Permite fazer um mapeamento de um tipos de objeto. O `Record` é muito utilizado para definir tipos que contém chave e valor:

```typescript
const scores: Record<string, number> = {
	"John": 10,
	"Jane": 18
}
```

Record aceita qualquer tipo como chave, podendo inclusive utilizar as restrições de atributo para restringir as chaves disponíveis de um objeto: 

```typescript
type Profile = "admin" | "user";

const user: Record<Profile, number> = {
	"admin": 1,
	"user": 2,
}
```

#### Typeof

Podemos utilizar o `typeof` para reutilizar tipos atribuídos em outras variáveis, extraindo a tipagem de uma variável para outra:

```typescript
interface Product {};

const product1: Product;

const product2: typeof product1; // Vai ter as mesmas propriedades do product1
```

#### Keyof

Extrai chaves de um objeto e utiliza como tipagem, similar como o typeof faz:

```typescript
const icons = {
	"home": "./path/home.svg"
}

const icon = keyof icons; // utiliza apenas as chaves que estão dentro de icons como possíveis valores.
```

