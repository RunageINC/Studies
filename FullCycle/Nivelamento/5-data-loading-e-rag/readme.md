# Introdução

Quando estamos lidando com documentos para a IA, podemos ter diversas fontes para esses documentos:

- Website
- PDF
- CSV
- Planilha
- Doc

Entre outros.

Uma das grandes necessidades que temos quando trabalhamos com IA é carregamento de documentos, dado que vamos pegar esse documento, jogar as informações em um banco de dados e a partir daí, podemos prover as informações para a IA.

O grande ponto, é que quando estamos fazendo uma pergunta pra IA, como podemos fazer com que essa IA leia o banco de dados e responda de acordo com a pergunta com as informações mais relevantes desse banco?

Se tivermos vários documentos no banco, e queremos saber por exemplo o faturamento no final do ano, temos que responder usando documentos específicos. Ex:

Prompt:
Responda a pergunta do usuário usando essas informações.

Informações:
{dados lidos no banco de dados}

Pergunta do usuário
{question}

Dessa forma, o sistema buscou esses dados de faturamento do banco, colocou como input para a LLM e então trouxe uma pergunta. Dessa forma, a IA vai conseguir responder de maneira assertiva.

Para trabalhar com esse tipo de dados, usamos RAG (Retrieval-Augmented Generation).

Mesmo com esses documentos, como conseguimos fazer com que a IA traga os dados mais relevantes dessas informações?

Para isso, realizamos uma busca semântica. Para conseguir fazer uma busca no DB de uma forma simples (como Qual o meu faturamento?). Mas nunca é tão simples dado que a IA é treinada em pesos. Para que isso seja aplicado, transformamos os documentos em vetores (embedding) e dessa forma a busca semântica vai conseguir aplicar.

No banco então, vamos guardar:

- Texto original
- Embedding (vetores) do texto
- Metadados { type: PDF, category: Faturamento, etc }

A busca funciona da seguinte forma: ao realizar a pergunta de quanto é o faturamento, vamos **transformar a pergunta em um vetor**. Uma vez que a transformação ocorre em vetor, podemos fazer a busca no banco de dados. Podemos fazer a busca nos vetores do banco de dados vs os vetores da pergunta.

Isso no final das contas nos traz os documentos mais próximos que fazem mais sentido armazenados no banco.

Temos também um parâmetro

$$
k = qtd de documentos.
$$

A dificuldade principal é a tratativa dos documentos, para garantir que o resultado enviado para a LLM será correto.

## Chunking

Vamos imaginar que temos um PDF de 1000 páginas. Gerar um vetor de 1000 páginas é uma péssima prática, dado que o contexto ficará imenso.

Para trabalhar com arquivos grandes, utilizamos uma técnica chamada de Chunking. O Chunking pega um document grande e separa em pequenos pedaços de X tokens definidos.

Dessa forma, ao invés de um documento de 1000 páginas, teremos 500 docs de 1000 tokens, sendo registros no banco de dados. Na hora da busca semântica ao invés de buscar 1 PDF, estaremos buscando pedaços de PDF.

O problema principal é a perda de contexto dentro do próprio crop por conta do tamanho do token. Podemos tornar uma frase negativa positiva por exemplo dado que a continuação da frase pode estar no proóximo valor.

- O valor do produto é 1000 mas dependendo o valor é gratuito

chunk 1 - O valor do produto é 1000 mas dependendo
chunk 2 - O valor é gratuito

Considerando o chunk 2, o valor passa a ser gratuito. Para remediar essa situação, fazemos um Overlap, que é uma técnica de pegar tokens após a limitação que escolhemos. Por exemplo, um overlap de 100 busca 100 tokens após o corte. Funciona como uma margem de segurança para evitar problemas dessa forma.

Quanto mais tokens e maior o overlap, menor o risco mas mais caro fica o LLM.

> O Postgres é uma ferramenta boa para trabalhar com vetorização. Vale ressaltar que **é necessário entender um pouco de database management**
