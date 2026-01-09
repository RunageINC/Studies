from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter # Permite separação e chunking dos documentos
from dotenv import load_dotenv

load_dotenv()

loader = WebBaseLoader(web_paths=["https://www.langchain.com"])
documents = loader.load() # Carrega os documentos da web

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)

chunks = splitter.split_documents(documents)

for chunk in chunks:
    print(chunk)
    print("-"*100)