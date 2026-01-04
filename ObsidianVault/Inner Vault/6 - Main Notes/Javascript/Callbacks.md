
#JavaScript

São funções passadas como argumentos para outras funções pra serem executadas mais pra frente:

```javascript
function methodOne(callback) {
	doSomething();
	doOtherSomething();
	callback();
}
```

É necessário um cuidado ao lidar com callbacks por alguns problemas que podem surgir

### Callback Hell (Pyramid of Doom)

Quando temos uma série de callbacks entrelaçados, o código fica extremamente complexo de ler, manter e debugar:

```javascript
fetchData(() => {
    processData(() => {
        saveData(() => {
            notifyUser(() => {
                console.log("All done!");
            });
        });
    });
});
```

### Inversão de Controle (IoC)

Callbacks dificultam a inversão de controle, porque não sabemos mais como ou quando o callback será executado. Se a função principal estiver errada, pode acontecer de o callback ser chamado múltiplas vezes ou nenhuma vez.

### Error Handling dificultado

Com os callbacks, o error handling é muito mais difícil dado que temos que passar objetos de erro explicitamente:

```javascript
function fetchData(callback) {
    setTimeout(() => {
        let error = false;
        if (error) {
            callback("Error fetching data", null);
        } else {
            callback(null, "Data fetched");
        }
    }, 2000);
}

fetchData((err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
```

## Alternativas para o Callback

Existem alternativas para o callback que podem ser usadas:

- [[Promises]]
- [[Async/Await]]

