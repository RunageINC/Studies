
O grande objetivo da observabilidade é entender a saúde do sistema. Tendo nossa aplicação rodando em algum lugar, precisaríamos conseguir observar o sistema e entender se está saudável, rápido, lento, etc.

Também temos que evitar com que o cliente acabe descobrindo problemas no sistema antes de nós. Se não temos uma boa observabilidade, ficamos muito dependentes de feedbacks. A observabilidade vem para que consigamos observar e criar mecanismos para trabalhar em cima seja notificação, telefonema, sms, etc.

O conceito de observação é muito amplo então temos de definir o que queremos observar. Os pilares da observabilidade são:

- Logs
	- Registros imutáveis.
	- Possui data, hora e a mensagem
	- Tem de ser norteador
	- Não é interessante logar qualquer coisa, pois pode atrapalhar a investigação
	- Formato textual, estruturado ou binário
	- Atribuído a uma app
- Métricas
	- Consegue indexar alertas para métricas
	- Medidas quantitativas de desempenho. São valores inteiros para metrificar.
		- Memória, CPU, RPS, RPM, etc
			- Esse tipo de valor geralmente é o único que foge da regra de um inteiro e passa a ser um quebrado
	- Podem ser inferidas (número de sucesso/erro para um contexto, por exemplo)
	- Sempre incremental. Nunca diminui
- Rastreamento (Traceability/Traces)
	- Caminho que a requisição fez dentro de um sistema
	- Trace distribuído: vai do serviço A ao D, por exemplo, formando uma linha de execução e uma cadeia de eventos.
	- Tracing pode acontecer no banco de dados.

## Pilares da observabilidade

Uma das stacks mais conhecidas da observabilidade é a LGTM

- Stack LGTM
	- Loki
		- Agregador de logs
		- Performático e com sistema de indexação boa.
	- [Grafana](https://grafana.com)
		- Plataforma de visualização (Dashboard)
		- Unifica os sources
		- Ao mesmo tempo que se enquadra nas 3 (logs, metricas, tracing), não se enquadra em nenhuma.
	- Tempo
		- Traces
		- Rastreamento da app
	- Mimir (Time Series Database)
- Ferramentas open source, e inclusive podem ser executadas no docker. Mas não é tão trivial de se fazer.
- Prometheus também é uma ferramenta que entra nesse meio.
	- Sistema de métricas, coleta as métricas dos serviços

> TODO: Ver o módulo de observability da Rocketseat One

Grafana Cloud é uma ferramenta que gerencia essa stack de maneira menos complexa. Vale ressaltar que o Grafana Cloud gera um custo.

O grafana é uma opção mas temos também Elastic Stack, DataDog

### OpenTelemetry (OTel)

Framework open source mantido pela CNCF (Cloud Native Computing Foundation) que gera, processa e padroniza os dados, unificando para as ferramentas da aplicação, ou seja, o projeto não precisa saber qual a ferramenta (vendor) que está sendo usada (datadog, grafana, etc) sendo que esse framework consegue conversar com todas. Caso a app se mova de um vendor para outro, apenas o coletor de métricas do open telemetry que precisa ser mexido.


## Grafana

Depois de criar a conta, basicamente a stack estará pronta. Agora podemos adicionar algumas configurações para fazer a telemetria

### Conceitos do Grafana

- Span - por onde a app passou. Se foi em um banco, 1 span. Se foi em um endpoint, outro span.