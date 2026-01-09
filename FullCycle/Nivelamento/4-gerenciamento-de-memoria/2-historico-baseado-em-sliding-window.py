from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, prompt
from langchain_core.chat_history import InMemoryChatMessageHistory # Grava na memória RAM 
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import trim_messages
from langchain_core.runnables import RunnableLambda

load_dotenv()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that answers with a short joke when possible."),
    MessagesPlaceholder(variable_name="history"),
    ("user", "{input}")
])

llm = ChatOpenAI(model="gpt-5-nano", temperature=0.9)

# O include_system=True garante que o sistema seja incluído na mensagem, e o allow_partial=False garante que não seja parcial, ou seja a mensagem do assistente não será cortada.
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

prepare = RunnableLambda(prepare_inputs)
chain = prepare | prompt | llm

# Cria umaa espécie de gerenciamento de sessão simples
session_store: dict[str, InMemoryChatMessageHistory] = {}

# Checa se a sessão existe, se não, cria uma nova
def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

# Esse chain é um runnable que considera o histórico da sessão para cada input conversacional
conversational_chain = RunnableWithMessageHistory(
    chain, 
    get_session_history,
    input_messages_key="input",
    history_messages_key="raw_history")

config = {"configurable": {"session_id": "123"}}

response1 = conversational_chain.invoke({"input": "Hello, my name's Arthur. Reply only with 'OK' and do not mention my name."}, config=config)
print("Assistant: ", response1.content)
print("-"*30)

response2 = conversational_chain.invoke({"input": "Tell me a one-sentence fun fact. Do not mention my name."}, config=config)
print("Assistant: ", response2.content)
print("-"*30)

response3 = conversational_chain.invoke({"input": "What is my name?"}, config=config)
print("Assistant:", response3.content)