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
