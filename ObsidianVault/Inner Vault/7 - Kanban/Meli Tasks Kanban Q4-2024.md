---

kanban-plugin: board

---

## ToDo

- [ ] Mudanças Pref e Payment que vão morrer, estudar a partir do link: [https://furydocs.io/transaction-intent-api/2.115.0-trimp-7136-26/guide/#/README](https://furydocs.io/transaction-intent-api/2.115.0-trimp-7136-26/guide/#/README)
- [ ] Transbordo não está fluindo na finalização
- [ ] Fazer rotas MLC para os módulos
- [ ] Olhar o MP Purchase Wrapper para o device 150
- [ ] Visit manager criação de visitas com erro
- [ ] Refactor on Fast Live Chat
- [ ] Adjust history modules props
- [ ] Fazer com que a tabulação avise o history para refresh
		- Props como onSubmit dentro dos modulos por exemplo ajudam. Disparar um callback generico para escutar o evento.
- [ ] Adjust software options - it is currently holding the state. branch: enhancement/checkout-software
- [ ] Pricing
	
	- Ver como checar se já existe simulação


## Blocked

- [ ] Trocar os devices MLM no checkout


## Doing

- [ ] ###### Refactor module to be mobile as well
	
	Start Date: 07/08/2024 10:20
	End Date: 
	Total effort: 
	
	Do the refactor on all tabs so it can be mobile friendly
	
	- [x] Lead Summary
	- [x] <span style="color: red">Info360 - Cancelled</span>
	- [ ] Pricing
	- [x] Checkout
	- [ ] <span style="color:yellow">Combos - In Decision</span>
	- [ ] Checkout Details
	- [x] Finalization
	- [x] History
	- [x] Post-Sale
	
	[[Notes on Tech Debt CHECKOUT]]
- [ ] Ajustar o History Module para pegar o cust corretamente
- [ ] Quebrar a branch do crm + home pra integrações menores
	 Lead Summary
	- [ ] Info360
	- [ ] Pricing
	- [ ] Checkout
	- [ ] <span style="color:yellow">Combos - In Decision</span>
	- [ ] Checkout Details
	- [ ] Finalization
	- [x] History
	- [ ] Post-Sale
- [ ] ORDERS - Tasks
	- [x] Order Module 
	- [x] Order Page
	- [x] Order Header
	- [x] Intent Details Card
	- [x] Intent Details Skeleton
	- [x] Order Details Card
	- [x] Order Details Skeleton
	- [ ] No results screen
	- [ ] Back End Integration
	- [x] Fix invalid date
	- [ ] Add Order Shipment Details


## Done

- [ ] Mensagem outbound não está funcionando
- [ ] ###### Intent appear on list
	
	Start Date: 07/08/2024 10:20
	End Date: 
	Total effort: 
	
	Check why intent created is not appearing on the list on New CRM.
- [ ] Fixes on Home
	
	[[Bugfixes - Home + CRM]]
- [ ] Comentar o GPT na home
- [ ] Talk to Gabs about the error on MeliChat
- [ ] ###### Map all external calls and validate them under the Controller Advice
	
	Start Date: 22/08/2024 15:36
	End Date: 
	Total effort: 
	
	Description
	
	- [x] Fix on Controller advice for BFF Exception and Rest Exception
	
	[[Error Mapping]]
	Canva link:
- [ ] Deploys
	- [x] Leads
	- [x] Home
	- [x] TLV-CRM
- [ ] Documento não retorna na criação do lead
- [ ] Vulnerabilidade HOME




%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false,false,false]}
```
%%