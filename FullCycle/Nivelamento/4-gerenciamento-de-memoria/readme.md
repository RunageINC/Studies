# Introdução

Para agentes de IA, memória se refere a contexto e conteúdo passado para o modelo. Os LLM's são de forma geral stateless (não guardam informação).

A cada conversa com o modelo, as conversas não são armazenadas no modelo. Todas as vezes temos que enviar 100% do histórico novamente para processamento.

Isso nos leva a uma situação:

O modelo tem uma memória interna, responsável por guardar as respostas e pesos decisórios.Juntamente com cache e etc, isso são componentes de baixo nível.

Já o histórico pode se dividir em curto prazo e longo prazo. A memória de curto prazo é justamente utilizada durante uma transação/conversa/processamento. Por exemplo, podemos mandar um prompt pra tradução e receberemos o output, fazer uma pergunta, etc.

Podemos armazenar temporariamente (num banco de dados de cache, variáveis em memória server-side) ou até mesmo armazenar em banco de dados.

Entretanto, muitas vezes podemos ter a necessidade de ter o histórico inteiro da conversa. Nesse evento, entramos na situação de memória de longo prazo. Vale ressaltar que o longo prazo pode ser relativo. Podem ser anos, meses ou dias. Mas em suma, o longo prazo diz respeito ao histórico da conversa. Sempre esse histórico fica em um banco de dados (como o Chat GPT faz).

Com isso, a cada conversa onde estamos carregando o histórico, temos a possibilidade de restaurar o conteúdo anterior para continuar a conversa ou ler o histórico para ter o contexto para continuar a conversa.

O problema que pode surgir é correlacionado com o tamanho do contexto. Dependendo do período da conversa ou mesmo na densidade da conversa, o contexto pode ser imenso. E isso pode causar problemas dado que não queremos carregar tudo, dado que o contexto pode estourar o tamanho da janela. Para remediar esse cenário, temos o processo de sumarização para remediar tokens.

## Armazenamento do histórico

> As bibliotecas de memória do LangChain a maioria ficou depreciada.

Cada conversa é uma sessão, portanto um gerenciamento de sessão pode ser bem útil

O histórico pode ser visto no arquivo `1-armazenamneto-de-histórico.py`.

Porém, só o que fizemos não é o suficiente. Conforme o histórico cresce, isso pode se tornar um problema.

## Histórico baseado em sliding window

Conforme o histórico cresce, nós temos um problema de contexto. Para remediar, podemos fazer um sliding window e cortar as mensagens. Ainda que esse approach funcione, existem alguns caveats que acabam acontecendo como perda de contexto moderado dependendo da configuração de mensagens.

No arquivo `2-historico-baseado-em-sliding-window.py`, o código foi implementado considerando apenas as 2 últimas mensagens:

```python
def prepare_inputs(payload: dict) -> dict:
    raw_history = payload.get("raw_history", [])
    trimmed = trim_messages(
        raw_history,
        token_counter=len,
        max_tokens=2,
        strategy="last",
        start_on="human",
        include_system=True,
        allow_partial=False,
    )
    return {"input": payload.get("input", ""), "history": trimmed}
```

Essa função prepara os inputs com o trim, e devolve apenas o pedaço cortado. Uma breve explicação dos argumentos:

- **raw_history** - o histórico cru, das mensagens, devolve tudo.
- **token_counter=len** - definição de qual vai ser o limite que usaremos. Essa definição determina a mensagem como um todo, mas também pode-se limitar usando tokens
- **max_tokens=2** - número de tokens a ser considerados para o trim.
- **strategy="last"** - garante que o agente mostrará sempre as últimas mensagens. O agente pode mostrar também as primeiras.
- **start_on="human"** - define o ponto de partida a partir das últimas mensagens, sempre por uma interação humana.
- **include_system=True** garante que o sistema seja incluído na mensagem
- **allow_partial=False** garante que não seja parcial, ou seja a mensagem do assistente não será cortada.
