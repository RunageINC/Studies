# Introdução

Toda documentação tem uma estrutura, um arquivo que define como a API se comporta. Em vários padrões temos essas estruturas bem definidas e o ideal é que a API se auto documente conforme desenvolvimento.

Hoje o padrão de documentação de API's é o OpenAPI que ajuda justamente nessa manutenção de documentação em tempo de desenvolvimento. Hoje, é difícil encontrar uma API publica REST que não siga esse padrão.

Através dessa documentação, é possível exportá-la para um arquivo e usar em uma ferramenta de test como Postman, Insomnia, etc.

É possível também integrar o arquivo com libs de front para automatizar o processo.

Um grande exemplo de como essa documentação aparecerá para o cliente será entrando no [Scalar](https://scalar.com) e colando a doc `spec.yml` que foi feita.

## Integrando com Fastify
