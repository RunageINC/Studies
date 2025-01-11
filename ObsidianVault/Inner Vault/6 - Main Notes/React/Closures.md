## Closure no React

No React, temos o conceito de closures, onde uma função de estado executa apenas 1x independente do número de calls realizados. Isso porque a cada manipulação de estado, o React por debaixo dos panos recria o componente como um todo, setando um valor fixo. 

Para mitigar esse problema (se for um problema) pode-se utilizar uma função ao passar o novo estado utilizando do estado anterior:

```javascript
setLikeCount(prev => prev +1);
setLikeCount(prev => prev +1);
setLikeCount(prev => prev +1);
```

Sempre ao atualizar uma informação, e essa informação depender do valor anterior, o ideal é usar o padrão de funções.