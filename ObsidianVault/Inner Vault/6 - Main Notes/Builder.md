
#General 

Padrão criacional para criar objetos complexos de forma simples. 

Faz parte do padrão de Fluent Interface ou [[Fluent API]], onde utiliza de [[Method Chaining]] em seu processo de criação de objetos.

Muitas vezes, utiliza-se o padrão [[Facade]] para sequenciar os fluxos completos em uma pipeline. Isso resolve o problema que pode tornar o Builder ou o Fluent API um _anti-pattern_, dado que sempre que se utiliza do Builder, é necessário saber a ordem dos métodos (se existe).

Não são ideais para programação funcional, dado que tratam de estados do objeto. Mas são perfeitos para POO.



[https://refactoring.guru/design-patterns/builder](https://refactoring.guru/design-patterns/builder)

[https://github.com/ErickWendel/semana-javascript-e...](https://github.com/ErickWendel/semana-javascript-expert02/blob/main/aula04/public/pages/room/src/util/peer.js)

[https://refactoring.guru/design-patterns/builder](https://refactoring.guru/design-patterns/builder)

[https://en.wikipedia.org/wiki/Fluent_interface](https://en.wikipedia.org/wiki/Fluent_interface)

[https://martinfowler.com/bliki/FluentInterface.html](https://martinfowler.com/bliki/FluentInterface.html)