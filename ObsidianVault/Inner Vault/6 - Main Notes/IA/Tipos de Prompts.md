
Existem 4 tipos de prompts primordialmente:

1. Prompt Simples
	- Pergunta básica, genérica. Ex: como colocar índices no mysql?
2. Prompt com Contexto
	- Perguntas com contexto de execução. Ex: com um Banco PostgreSQL na versão 8, estou criando uma aplicação em Node conectando com o banco usando driver nativo pgsql. Gostaria de forçar o uso de um índice de forma eficaz, performática e validando se o uso está correto antes de deployar essa funcionalidade
3. Prompt Interativo
	- Uma contextualização interativa. Pode surgir de um simples, e a continuação da conversa pode ser levado em conta como interativo.
4. Prompt baseado em exemplo
	- Exemplifica o problema. Ex: Meu problema é esse: ..., ou aqui está meu código com login e senha ...
 

Em linhas gerais, o primeiro sempre deve ser evitado dado o quão raso a pergunta é para a IA.


## Prompt Simples

![[Screenshot 2026-01-10 at 09.27.10.png]]
![[Screenshot 2026-01-10 at 09.27.43.png]]

Prompt: "Escreva uma função para calcular a média de um array"

Alguns detalhes importantes: o chat coordenou toda a estrutura do código. dessa forma o código está em português (porque perguntamos em português também). Se nosso código não segue esse padrão, temos que fazer diversas alterações manuais. Outro detalhe a se notar foi que ele deu 3 exemplos, sem muita certeza do que esperávamos.

## Prompt com contexto

![[Pasted image 20260110093142.png]]![[Pasted image 20260110093154.png]]![[Pasted image 20260110093159.png]]

Prompt: "Escreva uma função em JS e Java chamada calcAverage que recebe uma lista de números inteiros (podem haver valores nulos). Trate os valores nulos e caso a lista esteja vazia, retorne nulo. Inclua um teste simples que valida a função."

Nesse prompt, estamos definindo a linguagem, a nomenclatura, adicionamos um caso de teste e também condições para ele trabalhar em cima. O código disponibilizado se torna muito mais coerente com o que esperamos.

## Exemplo de documentação

### Simples:

![[Pasted image 20260110093522.png]]![[Pasted image 20260110093532.png]]![[Pasted image 20260110093525.png]]![[Pasted image 20260110093546.png]]![[Pasted image 20260110093551.png]]![[Pasted image 20260110093555.png]]![[Pasted image 20260110093602.png]]![[Pasted image 20260110093606.png]]

Prompt: "Documente uma API rest para cadastro de usuários"

A resposta foi gerada com base nas boas práticas mais comuns de API: JSON, JWT, CRUD, etc.

A resposta não é ruim mas pode causar alguns problemas por exemplo se estivéssemos usando outro tipo de autenticação ou XML. Isso poderia facilmente ser um problema, onde teríamos que regerar o prompt.

### Com contexto

![[Pasted image 20260110093921.png]]![[Pasted image 20260110094009.png]]![[Pasted image 20260110094017.png]]![[Pasted image 20260110094033.png]]![[Pasted image 20260110094039.png]]![[Pasted image 20260110094044.png]]

Prompt: "Documente uma API REST em formato OpenAPI 3.0 para um sistema de cadastro de usuários com os devidos endpoints de Create, Read, Update, Delete. Inclua exemplos de requisição neste caso em  JSON e XML dado que estou trabalhando em um sistema com código legado sendo migrado para um código mais recente.  Inclua detalhes sobre a validação de campos e autenticação OAuth2"

## Prompt Exemplificado

![[Pasted image 20260110094356.png]]![[Pasted image 20260110094400.png]]![[Pasted image 20260110094406.png]]![[Pasted image 20260110094417.png]]![[Pasted image 20260110094422.png]]![[Pasted image 20260110094429.png]]![[Pasted image 20260110094433.png]]


Prompt: "Preciso mascarar um valor que retorna do banco onde o valor é um valor monetário. Meu código é em Java.

Ex: quando possuo armazenado na coluna (PostgreSQL) o amount o valor de 98050 que correspondem a 980,50 BRL. Como eu escrevo uma função que cria esse mask ideal ideal e retorna o valor de forma monetária?"

Com o exemplo, ele conseguiu se contextualizar e criar ainda além trazendo modelagens.

## Prompt Iterativo

![[Pasted image 20260110094553.png]]![[Pasted image 20260110094558.png]]![[Pasted image 20260110094610.png]]![[Pasted image 20260110094616.png]]![[Pasted image 20260110094629.png]]![[Pasted image 20260110094642.png]]![[Pasted image 20260110094653.png]]![[Pasted image 20260110094720.png]]![[Pasted image 20260110094726.png]]![[Pasted image 20260110094735.png]]![[Pasted image 20260110094748.png]]![[Pasted image 20260110094755.png]]![[Pasted image 20260110094803.png]]

Prompt 1: "Analise a seuginte query e identifique possíveis gargalos:

SELECT * FROM orders WHERE created at >= '2019-01-01'"

Prompt 2: "Sugira, na sua concepção até o momento, a versão mais otimizada possível dessa query"

É uma grande técnica para causar maior profundidade dentro 

## Exemplos de Prompts 

- **Problema**: Gerar uma função em Python que calcule o fatorial de um número, garantindo validação de entrada e retorno adequado
- **Prompt**: Preciso criar para fins de exercício uma função em python que calcule o fatorial de um número. Este número poderá ser um inteiro positivo ou negativo. É preciso validar este parâmetro de entrada. Preciso também retornar erros quando o parâmetro de entrada não for o esperado e o retorno deve ser o resultado do cálculo do fatorial do número.
- ---
- **Problema**: Documentar um endpoint RESTful para criação de usuários, incluindo campos obrigatórios, respostas esperadas e exemplos em JSON.
- **Prompt**: Possuo uma API RESTful. Esta API possui uma entidade de usuários (Users) a qual preciso documentar. Esta documentação deve incluir os campos obrigatórios: name, email e username. Toda a nomenclatura deve ser feita em inglês. O payload de entrada e o retorno desta API devem ser ambos em JSON. Documente para mim de forma que destrinchemos nesta documentação os parâmetros esperados, denotando quais são os obrigatórios, um exemplo de payload de entrada e um de retorno e a especificação dos parâmetros de retorno.
---
>[!NOTE] Exercícios
>Os problemas abaixo devem ser completados e depois colados com os respectivos prompts. Após isso, esse aviso pode ser deletado.

#### Problemas

- Refatorar a função abaixo para torná-la mais eficiente, sem alterar o resultado:

```python
def contar_vogais(texto):
	vogais = 'aeiouAEIOU'
	contagem = 0
	for letra in vogais:
		if letra in vogais:
			contagem += 1
	return contagem
```
---
- Pedir para a IA gerar um relatório em Markdown com base nos dados JSON fornecidos, incluindo cabeçalhos, listas e uma conclusão

```json
{
	"titulo": "Relatório de Vendas - Fevereiro",
	"total_vendas": 75000,
	"itens_vendidos": ["Notebook", "Mouse", "Teclado"],
	"melhor_vendedor": "Ana Souza"
}
```

**Prompt**: Possuo um arquivo que dentro dele existem vários objetos no formato JSON com o o abaixo (retirado de um dos objetos reais do arquivo)

```json
{
	"titulo": "Relatório de Vendas - Fevereiro",
	"total_vendas": 75000,
	"itens_vendidos": ["Notebook", "Mouse", "Teclado"],
	"melhor_vendedor": "Ana Souza"
}
```

Gostaria que a partir do exemplo acima (pode gerar outros objetos semelhantes para contextualizar o relatório com dados demos a partir do formato demonstrado no exemplo acima), fosse gerado um relatório em Markdown que contenha cabeçalho com as informações distribuídas, listas definidas e uma conclusão que detalha o contido no relatório e as informações mais pertinentes.


--- 
- Gerar uma função Python que valide endereços de e-mail garantindo que o formato esteja correto e retorne True ou False

- Pedir para a IA analisar o log de erro abaixo, identificar a causa raiz e sugerir uma correção no código

```plaintext
Traceback (most recent call last):
	File "app.py", line 42, in <module>
		resultado = dividir(10, 0)
	File "app.py", line 10, in dividir
		return a / b
ZeroDivisionError: division by zero
```

**Prompt**: Estou rodando meu código em Python e me deparei com o erro abaixo:

```plaintext
Traceback (most recent call last):
	File "app.py", line 42, in <module>
		resultado = dividir(10, 0)
	File "app.py", line 10, in dividir
		return a / b
ZeroDivisionError: division by zero
```

Atualmente não tenho muito expertise em debugar erros de console. Me auxilie por favor explicando em detalhes porque este erro está acontecendo, potencialmente onde está acontecendo e como eu poderia corrigir este erro para evitar que aconteça novamente.

---
- Otimizar a função abaixo para encontrar o maior número em uma lista, garantindo complexidade O(n)

```python
def encontrar_maior(lista):
	lista.sort()
	return lista[-1]
```


---
- Gerar testes unitários em Python para a função abaixo

```python
def calcular_media(numeros):
	if not numeros:
		return 0
	return sum(numeros) / len(numeros)
```

- Analisar o seguinte código e sugerir melhorias para listas grandes

```python
def duplicados(lista):
	resultado = []
	for item in lista:
		if lista.count(item) > 1 and item not in resultado:
			resultado.append(item)
	return resultado
```
