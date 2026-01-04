from langchain_openai import ChatOpenAI 
from dotenv import load_dotenv

load_dotenv()

# Chamadas para o modelo OpenAI
# Temperatura de 0.5 para criar respostas mais naturais e criativas
model = ChatOpenAI(model="gpt-5-nano", temperature=0.5) 
message = model.invoke("Hello World")

print(message.content)