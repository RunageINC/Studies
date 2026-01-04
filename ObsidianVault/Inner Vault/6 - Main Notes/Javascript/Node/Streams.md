
#Node 

Uma das ferramentas do Node que processa sob demanda.

Basicamente o arquivo é quebrado em pequenos pedaços sob demanda para ser processado. O arquivo é transformado em um buffer, onde cada pequeno pedaço de arquivo é chamado de **chunk**.

O funil do processamento é o readable stream.
O transform stream é a etapa de limpar dados, adicionar itens, etc. Mapear, converter, etc
A etapa de gerar o produto final é de responsabilidade das Writable Streams. Joga na saída do processo.

As pipelines são cada um desses processos. Devolvem uma promise a partir de um readable.

Em API's, o request é uma readable stream, e o response é uma writable stream.

ETL's são outro paralelo que podemos traçar com essas pipes

### PassThrough

Uma implementaçõa de uma stream de transform que repassa o valor como output
