
#Testing 

Também conhecido como nyc nos pacotes de instalação. É um pacote [[Node]] de [[Coverage]] de [[E2E Testing]] que garante que os testes estão cumprindo uma métrica mínima de cobertura.

É possível gerar um report visual criando um arquivo `.nycrc.json` na raíz do projeto. Após isso, quando executamos o report de coverage, uma nova pasta é gerada chamada *coverage*, contendo todos os formatos especificados no json:

> .nycrc.json
```json
{
    "branches": 100,
    "functions": 100,
    "lines": 100,
    "statements": 100,
    "checkCoverage": true,
    "reporter": ["html", "text", "lcov"],
    "ignore": ["**/node_modules/**"]
}
```

É possível visualizar quantas vezes cada um dos métodos foi testado a partir do report de coverage.