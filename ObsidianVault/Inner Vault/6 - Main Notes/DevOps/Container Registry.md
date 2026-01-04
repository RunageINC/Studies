Container Registry ou Image Registry é o local onde as imagens de containers ficam registradas, como uma espécie de github de imagens.

Apesar de ter essa possibilidade, a menos que seja um open source, não é uma boa prática ter esse tipo de imagem pública, dado que temos a exposição para todo o docker hub.

Para criar um repositório via CLI, devemos executar alguns comandos básicos:

- Criar uma build com o docker build 
	- `docker build -t widget-server:v1 .` 
		- Esse comando gera uma build taggeada com versionamento para subir no registry.
- _Em ambiente local_: podemos fazer o tag inteiro da imagem para versionar:
	- `docker tag widget-server:v1 arthurgomes/widget-server:v1`
		- Dentro do registry, teremos uma tag equivalente ao `nome do usuário/nome do projeto:versão`. Os containers seguem esse padrão, como podemos perceber no exemplo do postgres: `postgres:14.3-alpine`
		- A tag é opcional e podemos gerar uma imagem sem gerar uma tag. Apenas o processo de build serve.
- Realizar um push do container para o registry
	- `docker push arthurgomes/widget-server:v1`
		- Envia a imagem para o registry do docker hub.
		- Deve-se estar autenticado. Caso tenha erro, basta rodar `docker login`

> Um fato interessante é que o docker hub traz os layers da imagem criada.

