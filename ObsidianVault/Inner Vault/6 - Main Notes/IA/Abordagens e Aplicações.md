
> Cursos do Coursera - Especialização em ML e Especialização em DL - Andrew Ng

![[Screenshot 2026-01-08 at 18.19.42.png]]

O mercado sempre trabalhou baseado em modelos (model centric). Com exemplo, podemos usar um modelo de predição de churn (abandono de cliente de uma empresa). A predição pode vir em forma de sim ou não, ou em forma de probabilidade.

Esse modelo vai trabalhar com um conceito de hiper parâmetros. Esses parâmetros não são os dados propriamente ditos mas são parâmetros que vão treinar o modelo pra identificar um padrão. Com um determinado algorítmo que vai ser usado pra reconhecer padrões, na etapa de estimate, estamos imputando os dados ao modelo e dizendo qual a saída que esses dados têm, por exemplo que com a quantidade de chamadas que o cliente faz no call center, qual valor ele paga e qual o tipo de contrato (anual ou mensal) e também as pessoas que já saíram ou seja as que não são mais clientes. A partir dessa entrada, tenteamos entender um padrão.

Nesse momento, ocorre um fit no modelo. Pegamos esse modelo, que possui alguns hiperparâmetros, e tentamos estimar e entender o padrão. Ex: as pessoas que fazem muitas ligações (acima de um valor X) e com um contrato mensal tendem a sair.

A partir desse padrão, desse **estimate**, nós vamos para o step de **criticize**. Criticando esse padrão, pegando dados que o modelo nunca viu, separamos uma parte dos dados e enviamos pro modelo e mensuramos a acurácia. Se a resposta for certa, está ok, caso contrário não. E assim, segue o treinamento do modelo com trocas de algorítmos até chegar em um score válido de aceitação onde o modelo pode ser aplicado.

Já a abordagem Data centric os dados são mudados ao invés de ficar trocando os algorítmos. Essa abordagem segue do princípio de que talvez os dados estejam ruins e não o algorítmo. Dados são combustível, então com uma melhor curadoria, o resultado é melhor ao invés de apenas iterar os algorítmos.

Na abordagem model centric, se amanhã os dados mudam, o modelo volta a falhar e apresentar problemas.

## Aplicações de IA


|                                                    | Financeiro                          | Indústria                  | Saúde                                   | Varejo                                      | Telecom                                     |
| -------------------------------------------------- | ----------------------------------- | -------------------------- | --------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| **Análise Preditiva**                              | **Predição de inadimplência**       | Manutenção Preventiva      |                                         | **Previsão de Vendas**                      | Previsão de Receitas (Billing)              |
| **Sistemas de Recomendação**                       | Recomendação de investimentos       |                            | Medicina personalizada                  | **Recomendação de Ofertas**                 | Recomendação de Serviços                    |
| **Visão Computacional**                            | **Biometria para Mobile Banking**   | **Manutenção Preventiva**  | Análise de Imagens                      | **Navegação Virtual**                       | Manutenção Preventiva de Equipamentos       |
| **Reconhecimento de Padrões**                      | Análise de Mercado de Ações         |                            | **Descoberta de novos medicamentos**    | **Comportamento de Cliente**                | Comportamento de Cliente                    |
| **Detecção de Anomalias e Clusterização**          | **Deteção de Fraudes**              | Detecção de Falhas         | Deteção de erros médicos                | Segmentação de Clientes e Predição de Churn | **Segmentação de Clientes e Predição de Churn** |
| **Processamento de Linguagem Natural**             | **Chatbots**                        |                            | Assistência clínica remota              | Atendimento ao Cliente                      | **Atendimento ao Cliente**                      |
| **Séries temporais**                               | Análise de Mercado de Ações         | **Desempenho de Máquinas** | **Comportamento de doenças (pandemia)** | **Preço dinâmico**                          | Preço dinâmico                              |
| **Busca, Extração de Informação, Ranking e Score** | **Score de Crédito**                |                            | Descoberta de novos medicamentos        | Busca inteligente                           |                                             |
| **Aprendizagem por Reforço**                       | Otimização de Portfólio             | Otimização de Supply Chain |                                         | Otimização de Cadeia Logística              | **Otimização de Rede**                      |
| **Híbridas e Automação**                           | **Aprovação automática de crédito** | Controle de Qualidade      |                                         |                                             |                                             |


> OBS pra mim: automatizar jogos é basicamente aprendizado por reforço.