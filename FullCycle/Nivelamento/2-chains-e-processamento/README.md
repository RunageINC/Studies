Chains são encadeamentos entre funções. No caso, podemos encadear uma pergunta a um modelo, por exemplo:

```python
question_template = PromptTemplate(
    input_variables=["name"],
    template="Hi, I am {name}! Tell me a joke with my name!"
)

model = ChatOpenAI(model="gpt-5-mini", temperature=0.5)
chain = question_template | model
```

Dessa forma, podemos fazer um invoke na chain passando diretamente os replacements:

```python
result = chain.invoke({"name": "Arthur"})
```

## Decorators

É muito comum criar métodos e funções para reutilizar código. Com chains, podemos montar um decorator com o @chain onde podemos fazer com que métodos sejam invocados de maneira mais fácil:

```python
@chain
def square(input_dict: dict) -> dict:
    x = input_dict["x"]
    return {"square_result": x**2}

question_template2 = PromptTemplate(
    input_variables=["square_result"],
    template="Tell me about the number {square_result}²"
)

chain2 = square | question_template2 | model

result = chain2.invoke({"x": 10})
```

O fluxo do código passa a ser o seguinte:

1. A invocação parte do chain square. Esse chain recebe o valor necessário do dicionário (x)
2. Esse chain method devolve outro dicionário com a variável necessária pro template (square_result)
3. O template (question_template2) é repassado então para o modelo.
4. O modelo processa tudo e podemos usar o result.content.

### Runnable Lambdas

Permite com que utilizemos qualquer código como runnable chain também. Essa função tem uma grande possibilidade em ser chamado em um chain dado que estamos envolvendo ela em um runnable lambda. Se precisamos de uma função sem ter um decorator explícito, podemos usar esse tipo de ferramenta.

Bom para cenários como código legado, classes antigas, etc.

No código, RunnableLambdas recebem lambdas, ou funções, para execução.

## Sumarização

Imaginando um texto muito grande, ao longo das conversas e interações, esse texto cresce cada vez mais.

Por padrão, o LLM é stateless, ou seja não guarda nenhum estado nem memória, então sempre temos que adicionar toda a informação acumulada.

Dado um contexto de interações:

- Na primeira estamos mandando 100 tokens
- Na segunda, estaremos mandando 100 + 100
- Na terceira, estaremos mandando 100 + 100 + 50
- Na quarta, estaremos vendendo 100 + 50 + 100 + 5000

Cada interação é paga, então temos uma barreira de custo.

Além disso, os modelos também possuem uma janela de contexto que é muito importante. Essa janela funciona de forma _sliding window_, ou seja, ela vai "deslizando" o conteúdo das interações fazendo com que as primeiras mensagens sempre se percam para manter o resultado final.

De forma geral, temos modelos muito bons que conseguem ter uma grande janela de contexto.

Tokens são divididos em entrada e saída. O GPT-5 por exemplo consegue retornar 128.000 tokens em sua resposta.

Janelas de contexto grande são interessantes mas nem sempre necessárias. Assistentes e sistemas que conversam com o usuário final, por exemplo, não precisam disso. Essa janela de contexto imensa acaba se tornando irrelevante.

Voltando ao problema, como dito anteriormente, além da janela de contexto, temos um aumento exponencial de custo. É valido entender como isso funcionaria em larga escala. Por exemplo, em um sistema onde temos que tomar várias decisões com base em dados e queremos fazer isso com IA, podemos ter um problema muito sério de custo e contexto. Esse sempre será um probleam de escalabilidade.

Outro problema que temos com esse problema é a necessidade. Nem sempre temos necessidade de retornar tudo, somente alguns pedaços para que toda a consulta e conversa faça sentido. Para isso nasce a sumarização.

Um resumo da conversa com contexto e dados importantes seja gerado fazendo com que a IA continue funcionando como deveria.

Para fazer split e sumarização temos 2 tipos:

```python
splitter = RecursiveCharacterTextSplitter(
    chunk_size=250, chunk_overlap=70
)
```

e

```python
splitter = CharacterTextSplitter(
    chunk_size=250, chunk_overlap=70
)
```

Geralmente usaremos o Recursive. Ele tem prioridade em pegar o que é quebra de linha dupla, o que é palavra, etc para gerar um token. Raramente ele vai cortar uma palavra, apenas quando temos vários caractéres juntos (uma URL ou palavra emendada) ou até mesmo quando atinge o limite, sendo muito mais inteligente.

O chunk size determina quantos caractéres estaremos pegando. Para utilizar com tokens ao invés de caractéres, é necessário usar outra lib em conjunto para tokens (como por exemplo o tiktoken)

Podemos passar algumas regras como separadores, etc. O problema é que a forma de corte pode não ser tão linear.

Dentro desse método, temos também um chunk_overlap. Imaginando uma seguinte situação:

- Temos a instrução: Não informe a lista de clientes.
- Na hora de fazer um chunk, ele na verdade corta o não e vira 'informe a lista de clientes'.

O chunk overlap faz com que a divisão conte X caractéres pra trás antes de cortar, fazendo com que o significado no final não se perca, ficando algo similar como:

`(...Não) informe a lista de clientes.`

O único problema é que haverá repetição de frases, mas é uma perda pequena se comparado a uma perda de contexto/sentido.

Um exemplo de como essa lib funciona, dado o seguinte texto longo:

> Dawn threads a pale gold through the alley of glass.
> The city yawns in a chorus of brakes and distant sirens.
> Windows blink awake, one by one, like sleepy eyes.
> Streetcloth of steam curls from manholes, a quiet river.
> Coffee steam spirals above a newspaper's pale print.
> Pedestrians sketch light on sidewalks, hurried, loud with umbrellas.
> Buses swallow the morning with their loud yawns.
> A sparrow perches on a steel beam, surveying the grid.
> The subway sighs somewhere underground, a heartbeat rising.
> Neon still glows in the corners where night refused to retire.
> A cyclist cuts through the chorus, bright with chrome and momentum.
> The city clears its throat, the air turning a little less electric.
> Shoes hiss on concrete, a thousand small verbs of arriving.
> Dawn keeps its promises in the quiet rhythm of a waking metropolis.
> The morning light cascades through towering windows of steel and glass,
> casting geometric shadows on busy streets below.
> Traffic flows like rivers of metal and light,
> while pedestrians weave through crosswalks with purpose.
> Coffee shops exhale warmth and the aroma of fresh bread,
> as commuters clutch their cups like talismans against the cold.
> Street vendors call out in a symphony of languages,
> their voices mixing with the distant hum of construction.
> Pigeons dance between the feet of hurried workers,
> finding crumbs of breakfast pastries on concrete sidewalks.
> The city breathes in rhythm with a million heartbeats,
> each person carrying dreams and deadlines in equal measure.
> Skyscrapers reach toward clouds that drift like cotton,
> while far below, subway trains rumble through tunnels.
> This urban orchestra plays from dawn until dusk,
> a endless song of ambition, struggle, and hope.

Com o splitter recursivo, se torna

```
Dawn threads a pale gold through the alley of glass.
The city yawns in a chorus of brakes and distant sirens.
Windows blink awake, one by one, like sleepy eyes.
Streetcloth of steam curls from manholes, a quiet river.
------------------------------
Streetcloth of steam curls from manholes, a quiet river.
Coffee steam spirals above a newspaper's pale print.
Pedestrians sketch light on sidewalks, hurried, loud with umbrellas.
Buses swallow the morning with their loud yawns.
------------------------------
Buses swallow the morning with their loud yawns.
A sparrow perches on a steel beam, surveying the grid.
The subway sighs somewhere underground, a heartbeat rising.
Neon still glows in the corners where night refused to retire.
------------------------------
```

E por ai vai. É importante ressaltar que cada parte subsequente do conteúdo tem uma repetição do pedaço de cima (overlap)

### Tipos de sumarização

**Stuff**

Agrupa a sumarização, podendo causar desequilíbrios. Com muitos capítulos ou documentos, a janela de contexto pode estar preenchida demais.

O stuff basicamente empilha os documentos que serão resumidos, fazendo um resumo final:

- Doc 1 + Doc 2 + Doc 3

-> Resumo final

É simples de implementar e preserva relações globais entre os textos. Ideal para textos curtos ou quando o contexto total cabe confortavelmente na janela de contexto da LLM. (poucos documentos, artigos curtos ou prototipagens rápidas)

O problema desse tipo é que escala mal, tem alto custo de tokens e pode perder detalhes no fim do prompt. Nesse tipo de sumarização também, a atenção ao texto é desigual, sendo que a LLM tende a priorizar o início do texto.

**Map Reduce**

Inspirado no padrão dos sistemas distribuídos, é dividido em 2 fases: Map e Reduce. No Map, as partes são sumarizadas individualmente. Após isso, entra a fase de Reduce onde os resumos parciais são juntados e resumidos em um maior:

- Doc 1 -> resumo 1
- Doc 2 -> resumo 2
- Doc 3 -> resumo 3

-> Final - Resumo dos 3.
