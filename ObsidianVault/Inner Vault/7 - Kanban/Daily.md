---

kanban-plugin: board

---

## For Next Week - 12/01/2026

- [ ] Fechar o financiamento do Ape
- [ ] Marcar reunião com o Pablo (antes das 18)
- [ ] Planejar troca da cadeira
- [ ] Pedir ajuda com organização ao Rudy
- [ ] Traçar um plano para o E2E de remittances
- [ ] Cleanup Remittances


## For Tomorrow - <span query="jsFunc(, func = ()=&gt;(()=&gt;{const t=new Date;return t.setHours(0,0,0,0),t.setDate(t.getDate()+1),t.toLocaleDateString(&#x27;pt-BR&#x27;)})())"></span><span class="lv-live-text">09/01/2026</span><span type="end"></span>

- [ ] Cobrar Nutri
- [ ] Verificar as passagens pra LA


## To Do - <span query="jsFunc(, func = ()=&gt;(()=&gt;{const t=new Date;return t.setHours(0,0,0,0),t.toLocaleDateString(&#x27;pt-BR&#x27;)})())"></span><span class="lv-live-text">08/01/2026</span><span type="end"></span>

- [ ] Organizar financeiro
- [ ] Ver o financiamento do ape
- [ ] Ver meu look pro corrida
- [ ] Ver meu plano de saúde
- [ ] Passar a limpo as anotações de nivelamento em seus devidos tópicos para o Obsidian
- [ ] Ler Sentry Doc
- [ ] Ler Vercel Docs
- [ ] Changes by Rudy
	
	- Request more information
	- Open previous modal in step 2 with prefilled info (txn, documents, subject
	- Change email body template
	- Proceed to create a new form
- [ ] Create submitted screen
- [ ] Ver monitor novo Arzopa


## Doing

- [ ] Finalizar o EDD Forms tasks
	
	- [x] Upload
	- [ ] Form Creation
	- [ ] Form Submission
	- [ ] Events registered on retool
- [ ] Arrumar o Dash de Finanças (junto com o Massimo)
	
	### Scott comments
	
	#### 2 VA cards
	
	Hey Arthur. Yes we need the two cards because I want one that tells me how many accounts have been open between two dates and one that tells me the total number of accounts that have been open as of the end of a certain date
	
	#### Values
	
	Also, I was checking the data for GCash and confirmed the total credit amount PHP, and the FX spread amount  
	But I could not confirm the wire fee sum, the totals were very different
	
	Total deposits was also a value I could not confirm with the transactions table the card value seems very high
	
	Wire fees is more important to figure out first though
- [ ] Listar erros Sentry importantes
- [ ] Testar todo o fluxo do EDD Form
	
	```
	POST {remittancesHost}/risk/v1/provider-cases/{id}/documents form-data 
	
	PATCH {remittancesHost}/risk/v1/provider-cases/{id} { "status":"USER_SUBMITTED_DOCUMENT" } 
	
	GET {remittancesHost}/risk/v1/provider-cases/{id}
	```


## In Review

- [ ] Change env vars on vercel


## Done

**Complete**
- [x] Marcar Tattoo
- [x] Change templated email to have a non-changeable part
- [x] Remove required from description
- [x] https://meridianpay.slack.com/archives/C07KRG08BT3/p1767642393152309
	
	disable amount input - {{ getPaymentInstrument.data.pocket.details.balance === "0" }}
- [x] Tailwind theme no form
- [x] Change gcash logo img
- [x] Traçar plano de horas diário
- [x] Testar branch do Carlos
- [x] Marcar massagem pra meu amor
- [x] Fazer as rotas DNS para o Form
- [x] Arrumar o userId para ser uma URL compartilhável
- [x] Fazer mudança para o Justin
- [x] Search by Payment ID not working
- [x] Responder o Derek
- [x] Verificar o Endpoint do EDD Form
- [x] Ver minoxidil
- [x] Ver sobre o passaporte
- [ ] Falar com o Praia




%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,null,false,false,false,false]}
```
%%