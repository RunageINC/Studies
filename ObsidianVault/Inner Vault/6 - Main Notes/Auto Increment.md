ID's ordenáveis e que nunca irão se repetir por ser gerados automaticamente a partir do último ID. É um ID muito pequeno, ocupando poucos bytes. Utiliza da estrutura de números do banco de dados.

O banco possui uma tabela simples de um único atributo de metadados para cada tabela, que armazena qual foi o último ID, para gerar o próximo. 

Esse tipo de ID é ótimo para paginação de dados, dado que podemos utilizar offsets (offset based pagination).

Caso o offset seja não performático dado a quantidade imensa de dados, pode-se também utilizar outro tipo de paginação: o excludente (paginação baseada em cursores)

`SELECT * FROM posts WHERE id > 1200 LIMIT 1000` por exemplo.

O cursor no caso é o valor do ID, que irá apontar para um ponto no banco.

O problema maior com ID's auto incrementais é a falta de segurança, portanto não é um ID que pode ser público. Isso porque qualquer rota que mostre o ID pode ser adivinhada para o próximo item:

/item/2 -> pode ser adivinhado que existe o item 3, ou o 1.

