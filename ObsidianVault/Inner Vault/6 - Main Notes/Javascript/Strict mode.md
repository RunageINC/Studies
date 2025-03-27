
#JavaScript

Uma nova diretiva adicionada em 2015 com objetivo de evitar erros semânticos silenciosos da linguagem.

Usado por transpiladores como [[TypeScript]] e [[Babel]].

Adicionando uma linha no início do código: 

```javascript
'use strict'

const a = 1;
const b = 2;
```

É possível evitar uma série de erros silenciosos como apagar instâncias de memória, atribuir valores à variáveis inexistentes ou crie variáveis com keywords.

O Javascript é convertido para binários no motor do Node. No meio dessa conversão, existe um processo de otimização que verifica o código o tempo todo para buscar melhorias de performance, encurtando caminhos, etc. Portanto, se escrevermos códigos otimizados, esse caminho é encurtado.