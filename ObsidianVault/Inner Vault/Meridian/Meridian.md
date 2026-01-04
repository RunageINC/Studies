Wallet Number

- BPI - always required
- GCash - does not need
- Bankaya - Fallback

Backfills - trazer pagamentos velhos pro novo dynamo

### Acronyms

MTL - Money Transfer License
DOB - Date of Birth

### Meridian

Era uma empresa que provavelmente teria algo relacionado a blockchain com telefonia. Devido a pandemia, a blockchain perdeu hype (por conta de motivos tecnológicos).

Criaram o Remittences para se manter em mercado

Antigamente, o projeto era somente o `meridian-app`. Essa é a UI do remittences. O backend era escrito em alguns API gateways

Disparava um fluxo de step-functions ou mandava para uma lambda escrita em Scala.

O `merchant-payments` seria um produto para solução de empresas de telefonia. Foi lançado para quebrar a barreira de entrada.

O primeiro cliente foi a Deutsche Telekom, na Alemanha. 

Depois teriamos uma solução unica, core, com os serviços base.

As fases da migração: 
- Sair da estrutura de remittances de step functions na AWS e API Gateway, para conseguir trazer tudo em kotlin.

Banking -> remittances -> remittances worker
### Meridian Backend

Backend do merchant-payments. Mas vai conter todos os serviços nessa arquitetura. 

Merchant - BFF do merchant-payments
Remittences - Backend da app

Tudo que for criado tem que ser voltado para a **Meridian Network**. Essa network seria um produto que utiliza serviços e se tornará um core de tudo. Dados, transferências, etc.

top up - da pessoa pra ela mesma

remittence - de uma pessoa pra outra

### Funnel

#### Opportunity

PostHog
	- Has some graphs maintained by Daniel.

#### Events

### Validations

#### Veriff

Document 

#### Sardine

Engine de risk assessment. 

Plaid - conexão do banco
Astra - Tira o dinheiro da conta

#### Vercel

On vercel, under meridian app, we can see the configuration for each wallet

## SENTRY

Errors happens. When you know a new error happen, how do you prioritize or acknowledge something. It is a workflow to errors 

### Reverification

Every 1 year the user must re-kyc. But it happened twice on the same day.


SRS -> é um utilitário pra account e settlement. Distribui as url's também dos serviços que estão sendo acessados

Inflight Txn -> aguardando settlement. Ainda q tenha creditado na wallet, ela pode ainda falhar em dias. As validações são feitas antes.


## FRaud

EDD - Enhanced Due Diligence

Sardine is always the Source of Truth.