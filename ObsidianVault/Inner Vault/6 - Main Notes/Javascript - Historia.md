
O JavaScript é uma linguagem não-tipada, ou seja, podemos adicionar conteúdos diferentes para uma mesma variável

```javascript
let number1 = 12;

number1 = "a"; //Isso é possível
number1 = true; //Isso também é possível
number1 = [12, true, "a"] //também possível
```

Essa falta de tipagem também acontece nas funções. Podemos ter funções que esperam números, mas podemos passar outros tipos de variáveis nelas, por exemplo.

```javascript
function calcArea(a, b) {
	return a * b;
}

calcArea("string1", true); // Isso é passível de passar. O compilador não irá barrar esse tipo de comportamento, embora em tempo de execução cause um erro.
```

