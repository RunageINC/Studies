from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory # Grava na memória RAM 
from langchain_core.runnables import RunnableWithMessageHistory

load_dotenv()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"),
    ("user", "{input}")
])

model = ChatOpenAI(model="gpt-5-nano", temperature=0.9)

chain = prompt | model

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
    history_messages_key="history")

config = {"configurable": {"session_id": "123"}}

# Interactions

response1 = conversational_chain.invoke({"input": "Hello, my name's Arthur. How are you?"}, config=config)
print("Assistant: ", response1.content)
print("-"*30)

response2 = conversational_chain.invoke({"input": "Can you repeat my name?"}, config=config)
print("Assistant: ", response2.content)
print("-"*30)

response3 = conversational_chain.invoke({"input": "Can you repeat my name in a motivational phrase?"}, config=config)
print("Assistant: ", response3.content)
print("-"*30)
