Uma biblioteca para construção de interfaces altamente interativas. Se aproveita do paradigma da [[Programação Declarativa]]

Baseado no conceito de componentes ([[React Components]]) reaproveitáveis, é utilizado também para construir [[SPA]]'s (Single Page Application).

Hoje, podemos utilizar não somente em interfaces web, mas também para mobile ([[React Native]]), dispositivos de TV ([[React TV]]) e até mesmo realidade virtual utilizando o [[React VR]].

Quando acoplado a outras bibliotecas, o React consegue controlar interfaces de usuário em qualquer lugar onde o usuário esteja interagindo com algo visual.

Por ser uma lib, existem vários frameworks que o utilizam por debaixo dos panos como [[Remix]], [[Next]], [[Redwood]], [[Blitz]], e assim vai.

### Tipos de estado

- Local state - estados que são utilizados através dos hooks do react de useState, etc.
- Global state - estados usados através de libs, compartilhados entre os componentes (zustand, redux, etc)
- HTTP State - dados Http, requisições de API