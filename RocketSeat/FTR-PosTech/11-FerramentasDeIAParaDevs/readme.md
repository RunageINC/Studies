# Introdução

> A pós foi feita em PHP com Laravel mas por motivos de momento de carreira estarei reproduzindo os exemplos com Gradle + Kotlin

Básico para rodar o projeto:

- `.gradlew build`
- `.gradlew bootRun`

A estrutura de controller, model e dto para o product foram criadas com a IA.

## Copilot vs Tabnine vs Codeium

**Principais diferenças**

- GitHub Copilot (US$ 10/mês para indivíduos): Melhor para amplo suporte ao ecossistema (GitHub, VS Code, JetBrains) e geração de código avançada e criativa.
- Tabnine (US$ 12–39/usuário/mês): Focado em privacidade, permite auto-hospedagem ou implantação em VPC e é treinado em código confiável. Melhor para segurança em nível empresarial e conformidade de código.
- Codeium (grátis para indivíduos): Oferece a melhor experiência “grátis”, com autocompletar rápido, chat e bom suporte a IDEs.

**Resumo da comparação**

| Recurso            | GitHub Copilot               | Tabnine                     | Codeium                                         |
| ------------------ | ---------------------------- | --------------------------- | ----------------------------------------------- |
| Melhor para        | Usuários gerais / velocidade | Privacidade / empresarial   | Usuários gratuitos / velocidade                 |
| Privacidade        | Baseado em nuvem             | Alta (auto-hospedado / VPC) | Boa (sem treino de modelo com dados do usuário) |
| Plano gratuito     | Não (apenas trial)           | Limitado                    | Muito generoso                                  |
| Principal vantagem | Criatividade / contexto      | Privacidade / conformidade  | Velocidade / desempenho                         |

**Qual escolher?**

- Escolha o Copilot se quiser o gerador mais popular, completo e mais rápido “em estado bruto”.
- Escolha o Tabnine se trabalha com código sensível, precisa de conformidade de segurança rígida ou de opção auto-hospedada.
- Escolha o Codeium se quiser um assistente de código com IA gratuito e muito bom para projetos pessoais ou times pequenos.
