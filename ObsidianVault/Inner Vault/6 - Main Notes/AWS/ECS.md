
Significa Elastic Container Service. É basicamente um cluster, ou um aglomerado, de cargas de trabalho. O ECS precisa também de uma _Task Definition_, ou seja, um modelo de como a aplicação vai trabalhar. E por fim, também existe o conceito de *Task And Service*, muito comum quando vamos rodar cronjobs.

Esse serviço permite trabalhar com o [[EC2]], mas também permite trabalhar com o [[Fargate]]. 

Vale ressaltar que o cluster não é uma por aplicação mas sim um para várias aplicações.

Esse serviço não permite acesso externo, portanto para acessá-lo de maneira externa à AWS precisaremos configurar toda a rede. Para isso, será necessário configurar a [[VPC]].

As VPC's podem ser quebradas em micro-redes ([[Subnets]]) que vão seccionar ranges de IP's para trabalhar.

Importante ressaltar que o ECS sempre é pago e não pay as you go. Desde que hajam instâncias, terá custo.