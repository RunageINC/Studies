import os 
from pathlib import Path
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_postgres import PGVector

load_dotenv()

for k in ("OPENAI_API_KEY", "PGVECTOR_URL", "PGVECTOR_COLLECTION"):
    if not os.getenv(k):
        raise RuntimeError(f"Environment variable {k} is not set")

current_dir = Path(__file__).parent
pdf_path = current_dir / "pragmaticProgrammer.pdf"

docs = PyPDFLoader(pdf_path).load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, 
    chunk_overlap=150,
    add_start_index=False).split_documents(docs)

if not splitter:
    raise SystemExit(0)

enriched = [
    Document(
        page_content=d.page_content,
        metadata={
            k: v for k, v in d.metadata.items() if v not in ("", None)
        }
    )
    for d in splitter
]

#pegando a quantidade de registros de documentos enriquecidos e criando uma lista de docs nesse formato.
ids = [f"doc-{i}" for i in range(len(enriched))] 

embeddings = OpenAIEmbeddings(model=os.getenv("OPENAI_MODEL", "text-embedding-3-small"))

store = PGVector(
    embeddings=embeddings,
    collection_name=os.getenv("PGVECTOR_COLLECTION"),
    use_jsonb=True,
    connection=os.getenv("PGVECTOR_URL"),
)

store.add_documents(documents=enriched, ids=ids)