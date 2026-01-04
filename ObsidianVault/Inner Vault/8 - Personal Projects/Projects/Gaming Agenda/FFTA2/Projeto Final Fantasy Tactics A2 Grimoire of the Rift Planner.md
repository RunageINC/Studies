
## Sumário

Criar um projeto builder para organizar composições, servir como um banco de consultas e elaborar estratégias para o jogo de Nintendo DS Final Fantasy Tactics A2: Grimoire of the Rift.

## Contexto

Esse projeto tem como objetivo montar um builder e um gestor de informações sobre o jogo em questão. Além disso, servirá também como um projeto de estudos para entender melhor as tecnologias que podem ser utilizadas mediante desafios propostos, entender melhor custos de cada aplicação e utilizar de boas metodologias de desenvolvimento para cada módulo utilizado para resolução do problema, auxiliando no meu desenvolvimento como profissional.

Um dos maiores desafios que tenho hoje é criar diferentes times e estratégias para esse jogo. Eventualmente ao jogar, gosto de utilizar de estratégias diferentes e manter um time equilibrado, mas com a falta de organização somado à vontade de finalizar o jogo fazem com que o time no final das contas fique extremamente desbalanceado e apenas um tipo de estratégia seja empregada: ficar mais forte que o inimigo e finalizá-lo o mais rápido possível antes que ele tome uma ação.

Embora seja uma estratégia que funciona na maioria dos jogos offline, essa estratégia causa alguns problemas bem nítidos:

- Quando o inimigo enfrentado in-game possui mecânicas pouco convencionais como resistências elementais ou a atributos, ou até mesmo padrões de ataques aleatórios, tornando-o inviável de vencer somente na força bruta.
- Falta de criatividade estratégica ao encarar as lutas, fazendo com que sempre a mesma estratégia de powerfarming/overleveling seja aplicada.
	- Isso causa um desequilíbrio no time como um todo visto que o conjunto de personagens que participam da batalha ficam extremamente fortes e desiguais com o restante do time. Esse desequilíbrio não apenas acontece por nível mas também por recursos.
- Pouca utilização de outras metodologias de completude de missão como divisão de grupos dado que todo o banco está muito fraco para agir sozinho e o time principal precisa estar íntegro para as missões de história
- Desvantagem grande quando aplicadas regras que restringem um ou mais personagens do time principal, ou regras de nível/condições específicas (por exemplo não atacar um inimigo de nível menor ou banir usuários de dano físico). Os personagens de banco são fracos demais para cobrir efetivamente esses desequilíbrios causados pelas regras.

Além disso, eu particularmente gosto de criar sub-histórias dentro das limitações da história principal de cada jogo, tendo minhas próprias regras e composições. Organizar isso dentro da estrutura do jogo torna-se extremamente trabalhoso tanto pela limitação de folders de organização dentro do jogo quanto pela própria complexidade dos sistemas que eu mesmo crio.

## Solução Proposta

Para resolver o problema, será implementada a criação de um planner eletrônico somado a um centralizador de conhecimentos dentro do mesmo projeto. Esse planner, denominado FFTA2Builder será responsável tanto por ser o centralizador de conhecimentos quanto por ser o planner por usuário. O sistema será dividido em camadas sendo

- Camada de dados do jogo
	- Armazena tudo que o jogo tem de possibilidades: mapas, missões, itens, habilidades, classes, inimigos, etc.
- Camada de Planner
	- Armazena por conta as builds de cada jogador. Composições de times, especificações de cada personagem, planejamento tático, etc
- Camada de Teste de Estratégia
	- Testa a estratégia contra um grupo de inimigos ou uma missão específica. Diz sobre pontos fortes e fracos (pode ou não utilizar IA para essa análise).

## Requisitos

- Budget
- Tempo
- Ferramentas

## Impacto Esperado e Métricas de Sucesso

Definir o impacto esperado e como será mensurado

## Timeline

Linha temporal de cada fase.

## Conclusão

Sumário dos pontos apresentados