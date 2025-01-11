
Biblioteca java para [[Auditoria]] que pode ser usado com qualquer tipo de banco de dados, relacional ou não relacional.

Essa lib armazena um JSON na base de dados, podendo ser possível armazenar inclusive em outros datasources esses dados de auditoria.

Sua vantagem principal se dá devido à flexibilidade da estrutura de dados e sua diversidade em não estar atrelado especificamente a uma estrutura relacional. Porém sua grande desvantagem se trata do fato de que a base de dados tende a crescer muito, podendo causar um problema de sizing no banco de dados que armazenará os JSON's de auditoria. É importante também considerar quantas entidades serão auditadas.

O JaVers cria 4 tabelas de auditoria e armazena os dados nelas de todas as tabelas que serão auditadas.

![[javers.png]]

- **Snapshot** - Armazena a alteração em si, referenciando o Global ID.
- **Commit** - Armazena a informação do commit da alteração, inclusive guardando a versão.
- **Commit - Property** - Se houve adição de propriedade no commit.
- **Global** - Cria uma relação entre o ID e a entidade. Cria um ID interno da chave para determinar qual foi a alteração. 