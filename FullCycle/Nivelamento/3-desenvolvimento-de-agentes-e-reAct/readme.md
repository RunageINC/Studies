# Introdução

Ponto importante: é possível criar agentes com LangChain puro, mas com a necessidade que temos hoje o normal é trabalhar com múltiplos agentes.

Quando essa arquitetura começa a ocorrer, somente o LangChain não é mais tão indicado.

Agentes simples podemos usar com certeza o LangChain. Mas agentes mais complexos, o ideal é pensar um pouco melhor.

Quando nos referimos a Agentes de IA, estamos falando que ele é um software comum onde o centro é a LLM. O ponto de entrada não vai ser um entrypoint RESTful ou algo assim, mas sim uma chamada a essa LLM, que vai receber uma instrução e tomar decisões.

O agente pode ter comportamentos, tomar decisões sobre o que fazer. E para isso temos que prover o agente com ferramentas, informações, prompts.

## ReAct

Uma das formas de se trabalhar com agentes, o ReAct basicamente é a reação com base em uma instrução. Mas não somente reagir, como também utilizar da parte de Reasoning, observando o resultado e agindo em cima novamente.

Pensar -> Agir -> Observar -> Pensar

O ciclo se repete até que o problema seja resolvido. O ReAct é trabalhado a nível de prompt.

# Exemplo de conversa utilizando ReAct

## Contexto

O agente tem acesso às seguintes ferramentas:

- `search_flights(origem, destino, data)`
- `search_hotels(cidade, datas)`
- `check_weather(cidade, data)`

O objetivo do agente é **planejar uma viagem básica**.

---

## 👤 Usuário

Quero viajar para o Rio de Janeiro no próximo fim de semana. Pode me ajudar a planejar?

---

## 🤖 Agente (ReAct)

### 🧠 Raciocínio 1 — Planejamento inicial

Preciso entender:

- Datas exatas do próximo fim de semana
- Origem do usuário
- Preferências básicas

Antes de agir, vou coletar o mínimo necessário.

### 🎯 Ação 1

Perguntar informações essenciais.

### 💬 Resposta parcial

Claro! Antes de avançar, só preciso confirmar:

- Você vai sair de qual cidade?
- Prefere viajar de avião ou ônibus?

---

## 👤 Usuário

Saio de São Paulo e quero ir de avião.

---

## 🤖 Agente (ReAct)

### 🧠 Raciocínio 2

Agora que sei:

- Origem: São Paulo
- Transporte: avião

Posso:

1. Determinar as datas do próximo fim de semana
2. Buscar voos disponíveis

### 🎯 Ação 2

Calcular datas do próximo fim de semana.

### 👀 Observação 2

Próximo fim de semana:

- Ida: sexta-feira
- Volta: domingo

### 🎯 Ação 3

`search_flights("São Paulo", "Rio de Janeiro", "sexta-domingo")`

### 👀 Observação 3

Resultados encontrados:

- Voo sexta 18h → 19h (R$ 420)
- Voo sábado 7h → 8h (R$ 390)
- Volta domingo 20h → 21h (R$ 450)

---

### 🧠 Raciocínio 3

Antes de sugerir um plano final:

- Verificar o clima
- Avaliar hospedagem

### 🎯 Ação 4

`check_weather("Rio de Janeiro", "sexta-domingo")`

### 👀 Observação 4

Previsão do tempo:

- Sexta: sol com nuvens
- Sábado: pancadas de chuva à tarde
- Domingo: sol

---

### 🧠 Raciocínio 4

Clima aceitável para turismo.
Agora posso buscar hotéis bem localizados.

### 🎯 Ação 5

`search_hotels("Rio de Janeiro", "sexta-domingo")`

### 👀 Observação 5

Hotéis disponíveis:

- Copacabana, 3★ — R$ 280/noite
- Ipanema, 4★ — R$ 420/noite
- Centro, 3★ — R$ 230/noite

---

## ✅ Resposta Final do Agente

Aqui está uma sugestão de plano para o seu fim de semana no Rio de Janeiro:

### ✈️ Voos

- **Ida**: sexta-feira às 18h — R$ 420
- **Volta**: domingo às 20h — R$ 450

### 🌦️ Clima

- Sexta e domingo com sol
- Sábado com chance de chuva à tarde

### 🏨 Hospedagem

- **Copacabana (3★)** — melhor custo-benefício
- **Ipanema (4★)** — mais conforto e localização premium
- **Centro (3★)** — mais econômico, menos turístico à noite

Se quiser, posso:

- Ajustar para um **orçamento máximo**
- Criar um **roteiro diário**
- Comparar **datas alternativas**
- Incluir **restaurantes e passeios**

---

## Criando um agente

> Importante! É necessário instalar o langchain_classics com pip install langchain-classic dado que todas as libs estão depreciadas

Para definir o agente, vamos importar algumas coisas do langchain:

```python
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
load_dotenv()
```

Agora vamos definir uma função que vai executar os passos:

```python
@tool("calculator", return_direct=True)
def calculator(expression: str) -> str:
    """Evaluate a simple mathematical expression and return the result."""
    try:
        result = eval(expression) # security risk since we're executing anything here in the expression
    except Exception as e:
        return f"Error: {e}"
    return str(result)
```

Deve ser observado que estamos usando expression e não x, y, etc. Isso porque a função vai receber os dados do agente e não variáveis. Dentro dessa função, teremos um parser para isso. Trabalhar dessa forma é mais frágil dado que não existe uma garantia, mas pode-se fazer isso de uma forma mais controlada com interfaces e etc. Forma ideal quando não temos controle do que vai ser o input.

Essa função está decorada com @tool, para definir como uma ferramenta utilizável pelo agente.

Após isso, com as nossas tools definidas, podemos criar o modelo com instruções bem definidas:

```python
llm = ChatOpenAI(model="gpt-5-mini", disable_streaming=True)
tools = [calculator, web_search_mock]

prompt = PromptTemplate.from_template(
    """
    Answer the following questions as best as you can. You have access to the following tools.
    Only use the information you get from the tools, even if you know the answer.
    If the information is not provided by the tools, say you don't know.

    {tools}

    Use the following format:

    Question: the input question you must answer
    Thought: you should always think about what to do
    Action: the action to take, should be one of [{tool_names}]
    Action Input: the input to the action
    Observation: the result of the action
    ... (this Thought/Action/Action Input/Observation can repeat N times)
    Thought: I now know the final answer
    Final Answer: the final answer to the original input question

    Rules:
    - If you choose an Action, do NOT include Final Answer in the same step.
    - After Action and Action Input, stop and wait for Observation.
    - Never search the internet. Only use the tools provided.

    Begin!

    Question: {input}
    Thought: {agent_scratchpad}
    """
)
```

Depois disso vamos configurar o agent de reAct e o executor desse agente. Vamos deixar o stop sequence como falso dado que o GPT 5 não tem suporte mas basicamente é um token que previne grandes alucinações pois faz com que o agente pare antes.

Dentro do executor, iremos configurar quantas interações máximas ele pode fazer até nos devolver a resposta final.

```python
agent_chain = create_react_agent(llm, tools, prompt, stop_sequence=False)

agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent_chain,
    tools=tools,
    verbose=True,
    handle_parsing_errors="Invalid format. Either provide an Action with Action Input, or a Final Answer only.",
    max_iterations=3)
```

## LangChain Hub

Como um git de prompts, fornece uma série de prompts utilizáveis. Vamos trocar nosso prompt por um deles, visto que temos uma bem similar.

```python
from langsmith import hub

...

prompt = hub.pull("hwchase17/react")
```

Vale ressaltar que nem sempre esses prompts são bons e devem ser investigados antes de terminar pra ver se bate com o esperado.

Outro ponto importante é que nem sempre ele usa as tools de forma esperada. Pode ser que o modelo tente, por exemplo, usar a calculadora para descobrir a capital de um país dado que ele não encontrou a resposta nas iterações que ele tentou. Temos sempre que estar atento ao limite de iterações para que não haja alucinação, e também ficar atento aos outputs. A temperatura de um modelo também faz total diferença para a criatividade.

Em resumo, IA não trabalha de forma determinística, portanto é sempre um ponto de atenção.
