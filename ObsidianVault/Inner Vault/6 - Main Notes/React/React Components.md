
Uma das vantagens do React, é a criação de componentes reaproveitáveis. Esses componentes são os elementos apresentados em tela mas com o benefício de serem criados apenas uma vez.

Existem 2 momentos onde devemos considerar separar algo em componentes menores ou mantê-los dentro do mesmo código:

- Quando um código se repete várias vezes em vários locais diferentes. Um elemento que se repete muito em tela.

- Quando conseguimos tirar algo de um componente maior sem que o componente pare de funcionar. Assim o componente maior fica mais limpo e com funcionalidade mais clara. Esse momento casa muito com o conceito de responsabilidade singular do SOLID.

Ao renderizarmos múltiplos elementos em lista, com a utilização de um map ou algo do tipo, precisamos sempre setar uma *key*.

A *key* é necessária somente para o React, para controlar a renderização e manter o controle adequado de cada componente criado em loop quando há uma alteração de estado e re-rendering. É ideal que não seja utilizado um indice de array para isso, devido a problemas de ordenação que podem causar erros na app. 

Outro conceito importante para o React é a imutabilidade. Essa imutabilidade permite com que o React seja mais performático, pois ao invés de alterar um valor em memória podemos criar um novo valor aumentando a velocidade da comparação.