# Intro

Desenvolvido pela Vercel, nasceu como um SDK para contemplar busca semântica, tool calling, e outras features que só exisitam em projetos complexos como o Langchain ou CrewAI.

## Open Router

Segue a mesma API da OpenAI mas consegue se comunicar com todos os modelos de AI que tem hospedagem própria. Faz um roteamento automático e utiliza todas as AI's disponíveis as vezes inclusive mais barato do que o normal.

Esse roteamento é importante dado que existem modelos que performam melhor do que outros. Alguns são mais caros do que outros enquanto que outros são mais performáticos embora mais baratos para tasks específicas.

Utilizando o OpenRouter, podemos configurar a response com um objeto no output, sendo uma das features por exemplo:

Uma app de formulário de pesquisa. O usuário podia criar um form com pergunta (texto ou múltipla escolha), podia ter uma resposta sendo 1, 2, 3 ou outro com free text. Esse form poderia adicionar uma série de perguntas.

Preencher através de um admin é muito trabalhoso. Na UI podemos mudar para que podemos ter apenas uma text area, como um chat. E ai podemos retornar por exemplo: queremos saber o nome do usuário, idade, e quanto ele domina de programação.

Com o objeto gerado pelo open router, podemos gerar de forma rápida um json para salvar no DB de forma simples.

Outra utilização é pra parte de relatórios. Em um sistema grande, temos todo dia um cliente pedindo um relatório diferente. Para isso, podemos fazer os filtros por produtos, dias, etc.

## Métodos de treinamento

Quando estamos lidando com informações específicas como pdf's privados, materiais de termos de uso, contratos, ou qualquer outro material que não seja de público acesso, ao utilizar o OpenRouter ou qualquer outro tipo de codificação voltada para trabalhar com agentes (como o próprio LangChain) não é possível estruturar da mesma forma que o ChatGPT por exemplo onde só arrastamos e colamos as coisas.

Antes de resolver esse problema, temos que lidar com outro: a janela de contexto possui tokens limitados, ou seja, arquivos muito grandes não podem ser utilizados. Existem algumas técnicas para resolver esse problema:

1. Fine Tuning
    - Cria um modelo a partir de um existente, mas alimentado com um json contendo um array de perguntas e respostas.
    - É necessário que as perguntas e respostas estejam armazenados em banco.
    - Se as perguntas não existem, esse modelo não serve (tem de ser um modelo próximo ao modelo de FAQ)
2. Embeddings / Search Based / Vector Store
    - Transcreve um arquivo em um modelo salvável de banco de dados de vetores.
    - Faz busca semântica nesse banco e envia para a IA, contendo limitação de tokens.
    - Ótimo quando temos o pré-processamento dos dados
3. Tool Calling
    - Usado quando não há controle sobre a criação de novos dados (informações real-time por exemplo).
        - Ex: Qual a previsãso do tempo de hoje?
        - R: Chamada para uma tool de previsão do tempo
    - Devemos considerar que a informação tenha que ser de acesso rápido, como chamadas de API.

## Libs adicionais para desenvolvimento

- marked - Biblioteca de compilação e parsing de markdown.
- react-markdown - Lida com markdowns a nível de componente do React.
- remark-gfm - Habilita extensões para markdown adicionadas pelo github (GFM ou Github Flavored Markdown)

