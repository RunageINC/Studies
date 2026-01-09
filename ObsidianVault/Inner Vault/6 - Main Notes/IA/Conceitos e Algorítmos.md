
## Regressão linear


Site: [Linear Regression](https://observablehq.com/@yizhe-ang/interactive-visualization-of-linear-regression)

Algorítmo bem clássico de aprendizado de máquina, trabalha um conjunto de variáveis para predizer uma outra variável, sendo essa outra variável numérica.

Ex: com o eixo X e Y, no X queremos usar como base o índice de massa corporal enquanto que o Y seria o nível de glicose que a pessoa tem no sangeu pela manhã. O X passa a ser a explicativa e o Y a preditiva. 

O objetivo é ajustar uma reta, uma linha, onde a diferença entre o ponto e a reta seja a menor possível, que seria o erro absoluto (exemplo no site). A reta representa muito bem a relação entre o IMC e o nível de glicose, gerando a famosa equação da reta. A reta é uma tendência geral entre os dados.

Outro bom exemplo seria: quantas horas de estudo cada aluno precisa para tirar uma nota? O X seriam as horas de estudo, sendo a variável explicativa, enquanto que o Y seriam as notas. Cada aluno vira um ponto e a reta passa a traçar a tendência entre esses valores.

Equação:

$$
y = ax + b
$$

y - o valor que queremos prever (nota ou glicose)
x - valor conhecido (variável explicativa)
a - inclinação da linha (quanto Y muda quando X aumenta 1)
b - ponto onde a linha cruza o eixo Y (quando x = 0)

Se **a** é positivo - quanto mais X, maior Y
Se **a** é negativo - quanto mais X, menor Y

Esse tipo de modelo escolhe a linha que minimiza os erros.

É muito usado em previsão de vendas, estimativa de preços por exemplo de imóveis, análise de impacto de uma variável sobre outra, etc.

Possui algumas limitações importantes:

- Assume relação linear (reta)
- Não funciona bem com dados muito caóticos
- Correlação não tem a ver com casualidade. No exemplo do estudo nem sempre somente mais estudos estão associados a notas maiores. Outros fatores podem influenciar no resultado.

## Algorítmo de classificação - k-NN

Site: [kNN](https://www.tomasbeuzen.com/animated-data/content/supervised-learning/k-nearest-neighbours.html#animation)

k-NN (k-Nearest Neighbors) determina que dependendo da quantidade de vizinhos de um ponto a qual classe esse ponto principal pertence. Olhando para os k dados mais próximos, usa eles como referência para categorizar.

Ex: Casas azuis determinam pessoas que gostam de café. Casas vermelhas determinam pessoas que gostam de chá.

O algorítmo de k-NN pinta a casa nova com a cor mais dominante. Se a maioria das casas próximas for azul, será azul.

O k significa o número de vizinhos considerados. Geralmente quanto menor o valor de k, mais sensível a ruído ele é, enquanto que quanto maior ele é mais estável mas pode perder detalhes. Existem técnicas pra escolher o melhor valor de k.

Para um novo ponto:

1. Calcula a distância entre ele e todos os outros pontos
2. Ordena essas distâncias
3. Seleciona os k mais próximos
4. Decide:
    - Classificação → voto da maioria        
    - Regressão → média dos valores

k-NN para classificação:

- Classes: “spam” ou “não spam”
- Se entre os 5 vizinhos:
    - 3 são spam
    - 2 não são  
     Resultado: spam

k-NN para regressão

- Prever preço de casa
- Pega os preços das casas vizinhas
- Faz a média

A distância nesse tipo de algorítmo mais comum é a distância euclidiana (em "linha reta").

Pontos mais próximos são mais parecidos, e mais distantes menos parecidos. Podem existir outras distâncias a serem consideradas como:

- Manhattan
- Cosseno
- Minkowski


| Pontos fortes                                      | Pontos fracos                                                 |
| -------------------------------------------------- | ------------------------------------------------------------- |
| Fácil de entender                                  | Lento com muitos dados dado que a comparação é feita em todos |
| Não precisa de treinamento complexo                | Sensível à escala. É necessário uma normalização dos dados    |
| Funciona bem com dados pequenos e bem distribuídos | Ruído pode confundir resultados.                              |


## Algorítmo de classificação - K-Means

Site: [K-Means](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/)

Algorítmo de agrupamento (clusterização). Busca responder a pergunta "quais dados são parecidos entre si?"

Os dados são divididos em grupos de modo em que os pontos de cada grupo sejam os mais parecidos possíveis. Cada grupo possui um centro chamado de centróide.

É possível visualizar dentro do site mencionado a utilização do algorítmo, mas em alguns clicks podemos entender como funciona esse agrupamento:

1. Base - escolha dos centróides ![[Screenshot 2026-01-08 at 19.31.04.png]]
2. Atribuição dos grupos aos centróides pertencentes ![[Screenshot 2026-01-08 at 19.31.32.png]]
3. Primeiro recálculo ![[Screenshot 2026-01-08 at 19.31.51.png]]
4. Pontos realinhados. Ainda possuímos alguns ajustes a serem feitos. ![[Screenshot 2026-01-08 at 19.32.06.png]]
5. Centróides atualizados![[Screenshot 2026-01-08 at 19.32.44.png]]
6. Pontos atualizados. ![[Screenshot 2026-01-08 at 19.32.59.png]]
7. Depois de alguns ajustes, conseguimos atualizar corretamente ![[Screenshot 2026-01-08 at 19.33.39.png]]

Ex:

Uma loja com clientes e dois dados: quanto gastam e quantas vezes compram. Queremos descobrir os tipos de clientes mas não sabemos quais existem.

Esse algorítmo pode ajudar a descobrir:

- Grupo 1: gastam pouco e compram pouco
- Grupo 2: gastam muito e compram pouco
- Grupo 3: gastam muito e compram muito

O K significa o número de grupos que queremos. Ex: k = 2 equivale a 2 grupos, k = 5 equivale a 5 grupos e assim vai. Essa definição **tem de ser a primeira a ser feita**.

Geralmente escolhemos K centróides iniciais que são aleatórios. Então atribuiremos cada ponto ao centróide mais próximo. Após isso, recalculamos os centróides onde o novo vira a média de todos os pontos do grupo.

Depois reatribui-se e recalcula os centróides a cada passo, até que os centróides parem de mudar ou atinjamos um número máximo de iterações.

K pode ser definido por técnicas ou pelo domínio.


| Pontos fortes                | Pontos fracos                                                |
| ---------------------------- | ------------------------------------------------------------ |
| Simples e rápido             | Precisa escolher K antes                                     |
| Escala bem para muitos dados | Sensível a valores iniciais                                  |
| Fácil de implementar         | Sensível a outliers (valores muito fora do padrão dos dados) |
|                              | Assume grupos "redondos"                                     |

## Rede Neural

Site: [Neural Network](https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.65240&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false)

Modelo inspirado no cérebro humano (bem de longe) usado para aprender padrões complexos a partir de dados. É boa de se usar quando a relação entre entrada e saída não é linear ou quando há muitos fatores interagindo ao mesmo tempo. 

Basicamente é um conjunto de mini decisões simples encadeadas. Cada decisão sozinha é fraca, mas juntas conseguem aprender coisas complexas.

Ex: categorização de um email de spam

Podemos pensar em algumas coisas como: muitas palavras em caps? Link suspeito? CTA suspeito (ganhe dinheiro rápido)? 

Cada pergunta acaba contribuindo um pouco para a decisão final. A rede neural usa a matemática para tomar a decisão.

Ela é composta de camadas:

- Camada de entrada
	- Recebe os dados (pixels, números, palavras, etc)
- Camadas ocultas
	- Onde o aprendizado acontece
	- Responsável por extrair padrões
- Camada de saída
	- Produz a resposta final

O neurônio artificial faz 3 coisas:

1. Recebe entradas (ex: x1, x2, x3)
2. Aplica pesos
3. Passa por uma função
	 - Soma tudo
	 - Aplica uma função de ativação 
	 - Gera uma saída

A fundação de ativação é usada para decidir se vai ativar ou não e o quanto vai ativar. Ex:

ReLU - Só passa valores positivos
Sigmoid - Transforma em probabilidade
Tahn - Versão mais suave

Sem essa estrutura de ativação, essa rede neural seria apenas uma regressão linear bem grande.

O momento de aprendizado ocorre em etapas. Primeiro, passamos pela camada de entrada, recebendo os dados. Em seguida vamos para as camadas ocultas na rede e por fim a saída. Após isso, há um cálculo de erro: o modelo compara o valor previsto com o valor obtido. Após essa comparação, os pesos são ajustados, onde se houve erro ele diminui o peso que atrapalhou e aumenta o que ajudou. Esse processo chama-se **Backpropagation** e é repetido milhares de vezes.

A rede neural pode ser shallow (1 camada) ou deep (acima de 2 camadas)


| Pontos fortes                     | Pontos fracos                                          |
| --------------------------------- | ------------------------------------------------------ |
| Aprendem representações           | Precisam de muitos dados                               |
| Lidam bem com alta complexidade   | Difíceis de interpretar (black box)                    |
| Não precisam de regras explícitas | Treinamento pode ser caro devido ao alto processamento |
| Descobrem os padrões sozinhas     | Sensíveis a dados ruins e outliers                     |

## Árvore de Decisão

Site: [Decision Tree](https://r2d3.us/visual-intro-to-machine-learning-part-1/)

A árvore de decisão é um modelo que toma decisões fazendo perguntas em sequência como um fluxograma. Uma árvore possui raiz (primeira pergunta), nós internos (perguntas intermediárias) e folhas (decisão final)

Para aprender as perguntas é escolhido as que melhor separam os dados, para deixar cada lado o mais "puro" possível. Algumas métricas comuns para separação de perguntas são Gini, Entropia e Information Gain.

A arvore de decisão para classificação é usada quando o resultado final é uma classe (ex: aprovado ou reprovado). Ja para a regressão é quando o resultado final é um número (preço de uma casa)


| Pontos fortes                                                     | Pontos fracos                           |
| ----------------------------------------------------------------- | --------------------------------------- |
| Extremamente interpretáveis. É possível ler o modelo literalmente | Tendem a overfitting (decorar os dados) |
| Funcionam com dados numéricos e categóricos                       | Muito sensíveis a pequenas mudanças     |
| Não exigem normalização                                           | Árvores grandes ficam confusas          |
| Lidam bem com não-linearidade                                     |                                         |
 Para controlar isso, é ideal limitar a profundidade, exigir um número mínimo de exemplos por nó e podar a árvore (pruning)

## Avanços

Reconhecimento facial e visão computacional: [Recognito](https://recognito.vision/face-biometric-playground)
Playground de treino de máquinas (Google): [Teachable Machine](https://teachablemachine.withgoogle.com/train)
Text-To-Speech (Eleven Labs, muito conhecido): [ElevenLabs](https://elevenlabs.io/)
IA Generativa (GPT, DeepSeek, etc): [DeepSeek](https://chat.ai-pro.org/chat/deepseek/?wflow=01&keyword=deepseek&adid=782625472485&ppg=11&kt8typtb=arcana_wp&pmt=pay2&gad_source=1&gad_campaignid=19843319436&gbraid=0AAAAAB-_8YjTy1rAKw67Fng1HkOkDXTDa&gclid=Cj0KCQiAyP3KBhD9ARIsAAJLnnbpLRCIPw7TWHmRAyoLnbfURLm6ocDiAjN2KrXong5x-Xt4Glmhk-caAsnOEALw_wcB)

