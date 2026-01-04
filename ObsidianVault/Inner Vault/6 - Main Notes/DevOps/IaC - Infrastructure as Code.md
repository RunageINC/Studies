Tags: [[DevOps & Architecture]]

**IaC** significa _Infrastructure as Code_, ou seja é a camada de DevOps se aproximando da camada de código duas áreas com muita sinergia.

Quando criamos um recurso EC2 na AWS por exemplo, estamos escolhendo os recursos da máquina e fazendo as configurações normais. Ao colocarmos a escalabilidade como um fator, temos alguns problemas pra manter esse padrão. Por exemplo: como sabemos que um recurso já existe na nuvem? Como acompanhamos o custo? Evitamos duplicação?

Pode ser que alguma pessoa da organização já tenha criado um EC2 e pode ser que no final as coisas acabem se chocando. A nível de governança, é ruim o acompanhamento.

O conceito pode ser aplicado pra todas as infraestruturas (Azure, Digital Ocean, AWS, etc).

![[Pasted image 20260104153800.png]]

O IaC se torna sempre a fonte da verdade de maneira declarativa para criação dos recursos. O controle de custos e a governança se tornam melhores.

## Ferramentas de IaC

Existem 3 grandes ferramentas que são usadas para IaC:

- Terraform
	- Agnóstico ao Cloud Provider
	- Muito usado por devops
	- Trabalha com HCL (HashiCorp Configuration Language) muito parecido com um json mas com particularidades da linguagem
	- Possui um CDK também mas não é tão popular
- CDK (cloud development kit) do provider
	- AWS tem o CloudFormation
	- Heroku tem também um template de resources
	- Azure tem o Resource Manager
	- <span style="color: yellow">Gera uma espécie de lock-in no ecossistema dado que é específico para o provider</span>
- [[Pulumi]]
	- Agnóstico ao Cloud Provider
	- Aproxima o dev da infra no lugar do terraform
	- Trabalha com TypeScript/JavaScript/Go/Java
	- Está crescendo bastante até o presente momento (Jan 4 - 2026)

