
Trabalha com _realms_. Cada realm pode ser uma empresa distinta.

#### Client
O que vai se conectar na app (Authentication). Dentro de cada cliente, da pra adicionar uma role específica

#### Client Scopes
O que vai no JWT Token, garantindo permissionamento (Authorization)

#### Realm Roles
Role global. Uma boa caso seja necessário criar roles para diferentes apps, por exemplo posso ter uma validação no back e no front para acessar algum recurso.

#### Users
Usuários da app, incluindo o service account

#### Groups 
Grupos de permissionamento. Boa pratica de se atribuir permissão a grupos e os grupos aos usuários

#### Sessions
Informações de sessão como IP, etc

#### Events
Suporte a eventos (TODO: pesquisar mais)