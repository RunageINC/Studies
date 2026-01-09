# Introdução

Com relação ao CloudFront, a Vercel é a principal concorrente. A criação de um projeto dentro da Vercel é super simples, e já nos fornece uma estrutura de CI/CD

> Vale lembrar que a estrutura automática só permite o dono do repositório criar commits deployáveis. Se outra pessoa tentar commitar, vai ser um problema.

Para os estudos, vamos desabilitar esse webhook, e criar a pipe do 0.

A Vercel disponibiliza um CLI, mas vale ressaltar que todos os comandos de pull, build, install e deploy estão todos do lado da Vercel, e deve ser utilizado como único recurso.

Todo o código estará dentro de `vercel-main.yml`

Importante ressaltar que a Vercel espera algumas env vars não declaráveis nos steps mas sim dentro da estrutura de envs do próprio arquivo de workflow.

```yml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

O project ID pode ser incremental (PROJECT_ID_1, 2, 3, 4, etc). Só de estar declarado na env no topo do arquivo, já é o suficiente para funcionar.

## Entendendo o Preview

Podemos fazer testes em outras branches que não são a main. O preview não é um ambiente onde o usuário final vai ter acesso mas sim só o desenvolvedor.

É possível utilizar as actions no preview também, essa configuração será encontrada dentro de `preview.yml`

Diferentemente do arquivo principal, nós vamos usar a tag de branches-ignore para skippar a main e considerar apenas outros ambientes.
