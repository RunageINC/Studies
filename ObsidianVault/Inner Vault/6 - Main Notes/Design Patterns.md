
# Pattern vs Anti-Pattern

O Pattern é uma solução geral que pode ser reutilizada para resolver um problema em um contexto específico. Basicamente é um template de como resolver aquele problema. Podem ser usados para resolver um cenário no momento de seu desenho ou desenvolvimento.

Os designs orientados a objeto geralmente mostram os relacionamentos e interações em classes ou objetos sem especificar a implementação final do domínio.

Esses mesmos designs não são tão interessantes quando aplicados à programação funcional, visto que implicam em estados mutáveis, ferindo o principal princípio da mesma.

### DRY - Don't Repeat Yourself

Não tenha código duplicado. Se existe um código 2x, o ideal é se criar uma função que reutilize aquele comportamento em específico.

### KISS - Keep It Simple Stupid

Deixe o código mais simples possível, evitando complexidades, código macarrônico, etc.

### YAGNI - You Aren't Gonna Need It

Faça apenas o escopo da task. Não precisa se adiantar para problemas imaginários.


Uma das coisas importantes do Clean Code no geral, e que também aplica todas as regras mencionadas são os [[SOLID Principles]].

#### Padrões Criacionais

[[Factory Method]]
[[Test Data Builder]]

#### Padrões Comportamentais

[[Strategy]]
[[Observer]]

## Como escolher?

Não existe uma solução universal e nem uma tabela de de-para com padrões de projeto. O ideal é primeiro analisar o problema, e depois pensar na solução.