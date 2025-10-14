# CI e CD

Quando precisamos deployar/publicar/disponibilizar a app, não conseguimos ganhar agilidade sem CI/CD. Se o fluxo não for automatizado, existe uma oneração tremenda do time.

CI e CD são passos sequenciais que dependem de integração para garantir as entregas da aplicação de forma contínua e ágil.

- CI: Continuous Integration - Integração Contínua
  - lint
  - testing (unit | integration | e2e | smoke | stress)
  - algum scan de vulnerabilidade
  - scan de código (sonarqube, etc)
  - build
  - build da imagem de container
  - push da imagem no registry
- CD: Continuous Delivery - Entrega Contínua
  - Pull da imagem
  - Run

A ideia é de que esse fluxo inteiro aconteça a cada commit na main, ou seja a cada PR aberto para mergear com a main, ou branch dev, ou branch produtiva, dependendo da estratégia, podendo ser um gitflow ou qualquer outra coisa.

Os steps não são todos obrigatórios podendo ter mais ou menos steps. O mais comum de se utilizar para CI é o Github Actions.

O Github Actions executa um job que carrega e executa cada um dos steps

## Criando um repositório

Podemos criar via CLI ou interface mas o importante é ter um repo.
