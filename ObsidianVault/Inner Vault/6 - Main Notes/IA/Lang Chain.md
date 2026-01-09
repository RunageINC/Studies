
Criado por Harrison Chase, foi uma startup criada em outubro de 2022 e aberta em 2023 formalmente. Essa empresa teve um investimento inicial absurdo (35 milhões de dólares) e a empresa tem um valor estimado de 1.1 bi.

Em fevereiro de 2024 foi lançado o LangSmith e em maio de 2025 o LangGraph Platform.

O foco é em prover suporte para agentes de IA, sendo todo seu ecossistema voltado para isso. A ideia principal é a simplificação de integração com LLMs e serviços auxiliares. Pode ser usado para carregamento de dados, memória e contexto, busca de documentos, agentes, roteadores entre agentes, etc.

O LangChain abstrai uma série de detalhes que facilitam a construção dessas chains (formas de criar fluxos de execução de chamadas e transformações), diferente de SDK's puros como o da OpenAI onde todos os detalhes devem ser entendidos.

Devido a sua evolução rápida, foram gerados alguns desafios de compatibilidade. Muitas libs de uma versão para outra possuem funções depreciadas. Isso faz com que agentes de código também se percam um pouco mesmo possuindo uma janela de contexto, tendendo a trazer códigos de versões não atuais.

Seu desenvolvimento (em python) foi separado em pacotes específicos ao longo do tempo: 

- langchain-core, langchain (implementação de referência)
- langchain-community (integrações extras)
- pacotes de terceiros

A maioria dos pacotes são open source como o LangChain, LangGraph e muitas integrações.

O SemVer do LangChain é um pouco diferente, dado que eles não usam o mesmo modelo de major, minor, patch.

### Principais recursos

- Cria fluxos em etapas (runnables). Esses runnables são invocáveis que podem chamar modelos, processar dados, etc, de forma flúida.

- LCEL (LangChain Expression Language) - Quando tinhamos etapas de integração, por exemplo pegar um prompt de uma etapa e utilizar em outra etapa, o processo era bem burocrático. Agora, com a LCEL, basta utilizar a pipe | para compor runnables.

- Carrega e divide documentos (CSVs, JSON, HTML, Markdown, Sites). Com o splitter, ele consegue carregar documentos em pedaços menores, para trabalhar em cima.

- Modelos de Embedding e Armazenamento Vetorial: modelos de embedding pegam um conteúdo e o transforma em vetor. Quando estamos trabalhando com transformers, tudo que fazemos é baseado em vetores. Para usar esses dados, é necessário armazenar em um banco vetorial. LangChain facilita nesse cenário por ter esse acesso muito fácil e não voltado à implementação e não precisamos ficar em baixo nível dado que existe uma abstração. Também é possível fazer busca por similaridades em bancos de dados

- Agentes tomam decisões sobre qual ferramenta chamar para executar cada caso.

- Possui recursos de memória, histórico

- Possui prompt templates e placeholders para executar mensagens de prompt dinâmicos

- OutputParsing e Pydantic para definir modelos de estruturas de dados. Todo resultado é hidratado com o modelo do Pydantic

- Sumarização utilizando map-reduce para manter contexto e garantir a melhor capacidade possível para a IA.

## Ecossistema
### Lang Smith

É uma plataforma de observabilidade, monitoramento e debugging em produção. Pode ser utilizado de graça até certo ponto. Ajuda a monitorar as apps em produção, faz gerenciamento de custos, latência, é uma plataforma boa para trabalhar com os agentes.

### LangServe* API

Disponibiliza API's padronizadas para os agentes.

### LangServe* Hosted

Serve para fazer deploy de aplicações LangChain. Possui escalabilidade automática e infra gerenciada

### LangGraph Platform

Infra para agentes de IA. Cria agentes autônomos, cria fluxos e gerencia workflows. Trabalha muito com stateful agents.

### LangGraph Studio

Gerencia projetos LangGraph

### LangChain Hub

Publica, versiona, testa e baixa prompts e outros artefatos. Como um catálogo mesmo de projetos.

> Importante sempre checar o uso de cada função do LangChain. Devido a sua velocidade, pode ser que uma coisa que funcione hoje esteja depreciada amanhã.