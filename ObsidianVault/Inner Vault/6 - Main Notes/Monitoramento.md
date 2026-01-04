
Dentro do monitoramento, os **4 Golden Signals** ajudam a identificar os problemas antes de acontecerem, sendo eles:

1. Latência
	1. Própria
	2. De dependências
	3. Está saudável ou não saudável
2. Erros
	1. Códigos específicos
	2. Condições específicas
3. Tráfego
	1. Requests
	2. Conexões
	3. Desvios de tráfego
4. Saturação
	1. Grau de carga do serviço
	2. IO
	3. Disco
	4. RAM
	5. CPU

Esses signals são basicamente usados para:

- Solucionar problemas de vários componentes do sistema e, no futuro, encontrar a causa raiz e corrigir o problema de forma sustentável.
	- O momento de correção inicial, não deve ser focado na exploração da causa raiz, o foco é estabilizar os processos o mais rápido possível.
- Alertar a equipe sobre um incidente quando os sinais caem muito, para que se possa identificar o problema e trabalhar para remediá-lo.
	- Os alertas só devem ser feito para incidentes urgentes e apenas para a equipe responsável pela correção. 
- Planejamento de capacidade para monitorar e melhorar consistentemente as coisas ao longo do tempo.


Os tipos de monitoramento para cada tipo de serviço e sistema subjacente são:

1. Monitoramento do comportamento da aplicação
	- Tráfego
	- CPU
	- Erros
	- Threads
	- Tempo de Resposta
	- Transactions
	- Traceability
	- Pageviews (se for front)
	- Bootstrap metrics, etc
2. Monitoramento do Comportamento do HW
	- Rede
	- CPU
	- Memória
	- Reciclagem de VMs
	- Uso de disco
	- Etc
3. Monitoramento do Comportamento de Sistemas ou Ecossistema em Geral
	- Latência de Rede
	- Latência de Aplicação, base de dados ou qualquer outro serviço
	- Problemas entre clouds
	- Traffic metrics
4. Monitoramento pré-produtivo
	- Testes de carga
	- Testes de volume
	- Testes de estresse

Ferramentas comuns de monitoramento são: *New Relic*, *Datadog*, *Kibana (ELK stack)*, etc.

- **New Relic:** uma ferramenta que coloca o foco no comportamento de nossas aplicações. Com destaque para os módulos de Application Monitoring (APM) e  Browser Pro (para frontends).
	- **APM:** Monitora o comportamento server side. A unidade de medição é baseada em 'Transações', que se traduzem em métricas de throughput, error rate e performance, entre outras coisas, dependendo da tecnologia.
	- **Browser Pro:**  Monitora a nível Browser client side. A unidade de medição se baseia em Pageviews, que permitem medir response times, JS errors, AJAX requests etc.
	- **OTel (OpenTelemetry):** Esta é uma funcionalidade baseada em um padrão da indústria implementado no New Relic, no qual, por meio de uma instrumentação de aplicativa, podemos realizar o tracing distribuído. Dessa forma, podemos visualizar trazas completas cross aplicações e identificar as origens de erros e outliers em tempos de resposta.

- **Datadog**: uma ferramenta que se concentra principalmente:
	- Informações sobre a infraestrutura em que nossas aplicações estão em execução: CPU, Memoria, etc.
	- Informações sobre os servições de Fury: MySQL, KVS, etc.
	- Métricas detalhadas sobre o tráfego e o caminho que as solicitações percorrem desde a saída de uma aplicação até sua chegada a outra. Isso envolve análises sobre NGINX, Envoys, Middleware e etc. Permitindo uma compreensão de erros, tempos, entre outros coisas.
	
- **Kibana:** Permite disponibilizar visualmente logs de aplicações com possibilidade de utilização de tags.


## Alertas

✅ DO’s

1. Explicação humana entendível;
2. Impacto em nível de negócio;
3. Mecanismos de revisão e correção (runbook), conjunto de passos a fazer ao receber o alerta
4. Documentos que indiquem como escala o tema.

⛔ **DONT’s** 

1. **Spam**: só devem chegar alertas de questões urgentes e apenas a equipes que podem resolvê-los, ou seja, um alerta deve ser um gatilho para que a pessoa que o recebe tenha que agir imediatamente de uma forma concreta;
2. **Noise**: Não ter alertas falsos. Evite alertas falsos positivos ou alertas que não exijam ação imediata para evitar a "alert fatigue", garantindo que as notificações sejam configuradas de forma precisa e relevante

Existem 4 variáveis que podem gerar um alerta:

- **FIXED VALUES**: Valores fixos, são valores que podem ser predefinidos ou usados de acordo com a necessidade do que se está analisando. 
	- ✅ Ponto positivo: Facilidade da análise;
	- ❌Ponto negativo: Não funciona para todos os monitoramentos porque o valor é nominalmente alterado de acordo a representatividade dele;
	- 👉 Exemplo: No caso de termos 1000 erros, devemos alertar.
- **THRESHOLDS**: São porcentagens limites pré-estabelecidas para o alerta. Não sabemos se 1000 erros são representativos, então estabelecemos uma porcentagem de erros para o alerta.  
    - ✅ Ponto positivo: Modifica o valor de forma automática de acordo com a variação do comportamento;
    - ❌Ponto negativo: Não funciona para todos os monitoramentos;
    - 👉 Exemplo: O alerta acontecerá se atingirmos 10% de erros.
- **DEVIATIONS:** Usamos quando não sabemos se 10% de erros é algo ruim, mas vemos que é um desvio da normalidade, diferente do comportamento comum, e isso pode ser um erro.  
    - ✅ Ponto positivo: Assertividade da análise;
    - ❌Ponto negativo: Complexidade da análise;
    - 👉 Exemplo: O Comportamento habitual das segundas-feiras às 10 da manhã é de termos aproximadamente 1 milhão de requests e na segunda-feira seguinte temos 3 milhões, isso é um alerta que algo está ocorrendo. 
- **LACK OF DATA**: Falta de dados para poder alertar  
    - ✅ Ponto positivo: Identificação de problemas difíceis de ser localizados e antecipação na correção para não gerar um problema maior;
    - ❌Ponto negativo: Complexidade da análise;
    - 👉 Exemplo: Várias vezes o BigQueue se rompeu e não foi alertado por falta de dados.
