
Existem boas práticas e armadilhas que devemos considerar para criar prompts:

**Boas práticas**:

- Ser claro
- Ser específico
- Ter contexto
- Definir o formato de resposta desejado
	- Exemplificar entrada e saída
- Restringa a saída e parametrize a entrada para o formato desejado

**Armadilhas**:

1. Falta de precisão no assunto
2. Perguntas abertas sem especificidade ou relevância

Primeiro componente básico do prompt é a clareza e especificidade de um prompt. Vai contra a primeira armadilha.

- Prompt: Explique python

Essa pergunta vai trazer uma explicação bem genérica, abaixo do iniciante. Uma pergunta melhor seria:

- Prompt: Explique como se aplica os conceitos básicos de programação orientada a objetos em Python.

Pensando em um exemplo onde não sabemos muito sobre OOP, essa *inquiry* (pergunta) já evita a armadilha de falta de precisão.

Todo contexto deve ser relevante, caso contrário caímos na segunda armadilha.

Exemplificação de entrada e saída é crucial para o modelo entender e responder de forma otimizada. Por exemplo:

- Prompt: Converta números em palavras

Esse prompt por si só não vai trazer nada. É capaz de ele fazer ainda o agente perguntar qual formato específico das palavras, idioma, como serão os números (algarismos romanos, números naturais). Um melhor prompt para isso seria: 

- Prompt: Convera números em palavras no seguinte formato:
	- 1: UM
	- 2: DOIS
	- 3: TRÊS.
	Converta apenas os números de 1000000 a 1000050. Gere também uma saída com o formato sendo apenas os números em extenso, sem os caractéres numéricos.

Dessa forma, não há necessidade de dupla interação. 

Outro exemplo disso seria:

- Prompt: Explique recursão

Ele pode ter um contexto de recursão da linguagem de programação que estamos usando. Mas sem nenhuma especificidade. Para melhorar:

- Prompt: Estou trabalhando em um projeto da faculdade sobre recursão mas tenho dificuldade no tópico. O trabalho é em Java, só preciso saber o básico da recursão para executar o trabalho. Tente me explicar usando exemplos básicos e simples.

Dessa forma, estamos restringindo o campo de resposta para respostas simples e básicas, sem aprofundamento. E também estamos exemplificando a linguagem de programação que estamos usando na suposta faculdade.

## Few Shot Learning

Estamos dando uma contextualização prévia para que a partir desse exemplo ele me gere uma resposta. Apenas com "alguns tiros" estamos conseguindo resultado.

- Prompt: 
	Possuo essas duas consultas: 
	
	consulta 1: SELECT * FROM products WHERE price > 100;
	consulta 2: SELECT * FROM sales WHERE created_at > "2025-01-01"
	
	como eu faria uma consulta nesta base de dados para trazer apenas as vendas dos produtos cujo preço é maior que 100?

O agente consegue até mesmo sugerir joins entre as tabelas.

### Chain of Thought

Podemos aplicar a cadeia de raciocínio para melhorar o contexto. A Chain of Thought é a construção de um entendimento através de várias etapas intermediárias para que o prompt alcance a resposta final que a gente deseja. 

Isso se mistura com o prompt interativo, dado que a cada nova interação dentro do mesmo ambiente conversacional estamos adicionando novas informações. Podemos incrementar o prompt nas interações

- Prompt 2: Uma venda (sales) pode ter vários produtos relacionados (products) e usamos uma tabela chamada sale_products para fazer esta relação de 1 para N.
- Prompt 3: Precisamos que todos os produtos de venda tenham um preço maior que 100 e não apenas 1.

### Fine Tuning

- Prompt: Esta consulta é a mais otimizada possível? Caso não, traga-me uma sugestão melhor. Caso sim, traga-me sugestões adicionais de como melhorar a performance em geral do banco e da aplicação nesta consulta em específico.

Com esse prompt novo, o agente consegue aplicar melhorias de performance, sugestões, etc. O Fine Tuning serve para fazer interações com ajustes finos nas respostas do prompt.

## Zero Shot Learning

Não provemos nenhuma informação para o modelo, apenas pedindo para executar uma tarefa sem exemplo prévio (por isso "zero tiros").

- Prompt: Escreva uma query SQL para selecionar todos os produtos com o preço acima de 100.

Não existe exemplo prévio. Com tarefas simples, pode funcionar bem ou até mesmo se estamos fazendo do 0.

Mas com situações mais complexas, onde a tabela na verdade não tem o mesmo nome que o agente retorna no exemplo de código, ou até mesmo tenha relacionamentos complexos.

Dessa forma, teríamos que interagir uma vez mais. 