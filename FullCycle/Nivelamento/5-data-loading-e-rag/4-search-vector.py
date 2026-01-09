import os
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector

load_dotenv()

for k in ("OPENAI_API_KEY", "PGVECTOR_URL", "PGVECTOR_COLLECTION"):
    if not os.getenv(k):
        raise RuntimeError(f"Environment variable {k} is not set")

query = "Tell me more about the pragmatic programmer and the keys to becoming a better programmer. Also tell me about how to measure and key aspects of a good programmer."

embeddings = OpenAIEmbeddings(model=os.getenv("OPENAI_MODEL", "text-embedding-3-small"))

store = PGVector(embeddings=embeddings, collection_name=os.getenv("PGVECTOR_COLLECTION"), connection=os.getenv("PGVECTOR_URL"))

results = store.similarity_search_with_score(query, k=10)

for i, (r, score) in enumerate(results, start=1):
    print(f"Score: {score:.2f}\n")
    print("Page content:\n\n")
    print(r.page_content.strip())
    print("\n")
    print(f"Metadata: \n")
    for k, v in r.metadata.items():
        print(f"{k}: {v}")
    print("-"*100)