
### Server Actions

Faz basicamente o mesmo do TanStack React Query, mas com algumas limitações.

Dentro da função, adicionamos uma string:

```javascript
async function handleTag(form) {
	'use-server'

	console.log(form.get('name'))

	await fetch('url', {
		method: 'POST',
		data: { ...data } 
	})
}
```

Funciona basicamente como se estivesse montando uma rota http dentro da propria page.