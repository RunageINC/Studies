
#General 

Encadeamento de funções é o método de agrupar funções para serem chamadas uma após a outra. Muito utilizada no modelo [[Builder]]:

```javascript
const chainingExample = new Service();

chainingExample.doThis().doThat().doOther().build();
```

