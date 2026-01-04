
#JavaScript 

Funções de Javascript que se auto-executam. Dentro das IFEE's, podemos colocar contextos que morrem assim que executados, através da separação por chaves como se fosse um objeto:

```javascript
(async () => {
  // variáveis criadas aqui morrem após execução.
  {
    const data = {};
  }

  {
    const data = {};
  }
})();
```