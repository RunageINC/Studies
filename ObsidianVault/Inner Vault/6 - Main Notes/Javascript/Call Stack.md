
#JavaScript

Uma pilha de operações onde é armazenada a sequência de ações que um programa vai executar, linha por linha. 

Dá pra imaginar um callback chamando outro callback que chama outro, e por assim vai, de forma ordenada utilizando a estrutura de pilha FILO (First In Last Out).

O famoso erro de [[Stack Overflow]] vem de acúmulo de call stack, ou seja, múltiplas sequências.

É importante entender que as chamadas em javascript acontecem de forma async, sendo o call stack a maneira da linguagem de entender de forma ordenada essas chamadas múltiplas.

Sua estrutura é de uma tabela chave valor com a chave sendo um endereço de memória e o valor sendo um tipo primitivo ou um apontamento para outro endereço de memória. É também o lugar onde todos os valores (string, number, bigint, boolean, undefined, symbol) são armazenados.

Vale ressaltar que ele só armazena valores e não funções.