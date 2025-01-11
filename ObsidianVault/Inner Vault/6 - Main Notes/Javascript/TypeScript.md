Nasceu como um superset, um conjunto de ferramentas em cima do javascript para adicionar a [[Tipagem estática]] em cima de uma linguagem de [[Tipagem dinâmica]].

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

Essas interfaces ajudam não somente a tipar as variáveis mas também a descobrir erros antes mesmo de executar o programa.

Interfaces também podem ser estendidas para agregar comportamentos de outras interfaces.

Uma outra particularidade do TypeScript é o uso do tipo de arquivo `.d.ts` que permite com que seja criado um arquivo de definição de tipos. Esse arquivo não pode conter códigos javascript, somente tipagem.