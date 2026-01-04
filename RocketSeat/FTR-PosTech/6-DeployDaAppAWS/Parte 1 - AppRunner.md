# Intro

Com o projeto configurado previamente com o Docker, levando em conta todas as vantagens e desvantagens de cada aplicação, vamos começar a rodar a aplicação com o AppRunner.

Vale ressaltar que o AWS App Runner é pago, e calculado por hora por vCPU.

Para configurar o App Runner, vamos usar as opções de Container Registry e Amazon ECR com a nossa tag.

O deploy pode ser manual ou automático. Com o automático, a cada novo push gera uma tag. Geralmente o Manual é atrelado a problemas de segurança.

Deve-se configurar também uma role de segurança com o IAM. Essa role aplica algumas policies de segurança para travar os deploys do App Runner e manter seguro.

Vale ressaltar também que devemos passar todas as Runtime Environment Variables necessárias para rodar a aplicação. No caso da aplicação de widget, temos as de Cloudflare por exemplo:

<img src="./apprunner-setup.png" />

Por hora como não temos nada de Health Check, a porta 3333 em TCP deve servir perfeitamente para isso.

O App Runner permite também pausar a aplicação e aplicar um domínio customizado na AWS ou fora dela.

A AWS também retorna algumas métricas built-in com a possibilidade de criar outros dashes.

## Criando um Health Check simples

Para testar a aplicação, dado que no app original não temos uma rota de GET, vamos montar uma rota de Health Check simples que retorna um OK.

```typescript
import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const healthCheckRouteDocSchema = {
  summary: "Health Check",
  description: "Health Check for the application",
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
};

export const healthCheckRouter: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/health",
    { schema: healthCheckRouteDocSchema },
    async (_request, reply) => {
      return reply.status(200).send({ message: "OK" });
    }
  );
};
```

Em apps com muitas dependências, o /health precisa como boa prática testar todas as dependências como banco, serviços, etc.

Após a criação desse endpoint, vamos mandar essa imagem pro ECR de maneira remota

## Automatizando o step

Para automatizar a função do App Runner, é necessário um novo step no github actions:

```yaml
- name: Deploy to App Runner
  id: deploy-to-app-runner
  uses: awslabs/amazon-app-runner-deploy@main
  with:
    service: widget-server
    image-url: ${{ steps.login-ecr.outputs.registry }}/${{ vars.ECR_REPOSITORY }}:${{ steps.generate-image-tag.outputs.sha }}
    port: 3333
    region: ${{ vars.AWS_REGION }}
    cpu: 1
    memory: 2
    access-role-arn: ${{ secrets.AWS_ACCESS_ROLE_ARN }}
    wait-for-service-stability-seconds: 180
```

Para o Access Role, vamos criar uma role nova para comportar o deploy:

Em IAM -> Create Role, vamos usar um **Custom Trust Policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "build.apprunner.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

STS significa Service Token Security, que é um serviço de token da AWS que irá gerenciar a ação de assumir uma role.

Depois, temos que adicionar o _AppRunnerServicePolicyForECRAccess_ como policy de permissão (pode ser adicionado em um passo posterior), e nomear e descrever a permissão (algo como app-runner-service-role)

E por fim, como boa prática, vamos manter a tag de IAC = false

Vale dizer que o que será passado como access-role-arn **não é o nome do recurso em si** mas sim o valor ARN que é um identificador único da AWS, encontrado dentro da própria página da role.

Por fim, vamos adicionar um echo de finalização só para encerrar o fluxo no github actions:

```yaml
- name: App Runner Check
  run: echo "App Running... ${{ steps.deploy-to-app-runner.outputs.service-url }}"
```
