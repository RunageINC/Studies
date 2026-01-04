Tags: [[DevOps & Architecture]]

### Sem Containers

Ao rodarmos uma aplicação sem containers, precisamos obrigatoriamente ter o ambiente de execução daquela tecnologia instalada na máquina. Por exemplo, se for uma app em Node, precisamos de uma versão do Node compatível com o app. Se for em Java, uma JRE, e por assim vai.

Além disso, precisa-se também ter instalado todos os módulos/dependências que aquela aplicação exige. Todas as libs utilizadas precisam estar instaladas no mesmo ambiente para que tudo rode sem problemas. Toda essa necessidade se chama **Contexto**.

Esse approach com certeza executa a aplicação, mas torna a escalabilidade e [[#Portabilidade|portabilidade]] muito mais complicada. Toda a configuração precisa não somente estar na máquina do desenvolvedor mas também no servidor ao qual esse projeto irá rodar.

Somado ao problema de escalabilidade e [[#Portabilidade|portabilidade]], também temos o problema do contexto que pode não ser igual, não conferindo garantia de nada. Além da concorrência com outros recursos, não há garantia de nenhum dos outros pontos, ou seja, sem normalização não há garantia de que todos os ambientes de execução vão funcionar corretamente e de forma uniforme. Isso piora quanto mais oneroso é a configuração de cada tecnologia usada.

### Com containers

Corrige todos os problemas dado que a aplicação roda de maneira isolada. O container está póstumo a uma [[Imagem|imagem]], e esse container irá executar em cima dessa imagem.

A imagem pode ser pensada como uma receita para a execução do programa com todas as dependências necessárias ([[#Normalização |normalização]]).

Quem vai fazer a execução será o agent ([[Docker]]) ou algum outro orquestrador.

O propósito dos containers é muito parecido com o de [[Virtual Machine|VM's]] mas com muito mais facilidade de manter, dado que uma VM é muito menos portátil. Por debaixo dos panos, a nível de SO, o que vai ser usado é compartilhado do próprio host e o isolamento acontece somente na camada de aplicação. Outra diferença é a responsabilidade de cada um. Enquanto que uma VM não só gerencia a aplicação mas também os próprios recursos de SO, o container apenas constrói os binários para executar a app, sendo bem mais restrito para o propósito.

A nível de recurso, haverá o compartilhamento de recursos entre os containers mas de forma escopada, sendo possível configurar a quantidade de recurso que cada container usará. Isso pode ser inclusive segregado por host, altamente customizável. Se a app não precisa de um recurso X, não há necessidade de estar no container, ajudando a minimizar o tamanho do container. E como temos um número reduzido de pacotes no container, também evita com que ataques de segurança sejam feitos.
## Isolamento

Isola os recursos e dependências de cada aplicação.

## Portabilidade

Garante que o container consiga executar em todas as máquinas, de forma simples. Uma das garantias de portabilidade dentro dos containers é o [[Container Registry]], que registra um snap da imagem dentro de um registry permitindo o download dessa imagem e utilização em outros locais.

## Normalização

Garante que o container rode da mesma forma em todas as máquinas que utilizarem ele.

## Orquestração de Containers:

Existem uma série de maneiras de se fazer uma orquestração de containers. Localmente, a maneira mais comum é através do [[Docker Compose]].

Vale lembrar que os containers são _stateless_, ou seja containers efêmeros, sem estado. Qualquer alteração realizada em um container seja ele do que for (banco de dados, sistema, aplicação) uma vez reiniciado se perde. Para que possa haver um carregamento de estado.

Em cenários produtivos, o mais comum seria ir para uma solução de banco gerenciado, sendo o volume só utilizado em cenários onde a aplicação precisa ser _stateful_

## Redes em containers

