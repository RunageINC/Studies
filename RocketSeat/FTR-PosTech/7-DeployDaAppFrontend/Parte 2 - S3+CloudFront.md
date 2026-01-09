# Introdução

O CloudFront garante a entrega dos conteúdos do front end, e funciona muito bem com o Load Balancer. Como ele possui uma grande disponibilidade, a latência é baixíssima.

Ao criar uma nova distribuição, a primeira pergunta vai ser da origem. Apesar de ele mostrar o S3, nós não queremos usar o bucket que já existe, e portanto vamos criar um novo, do 0.

Depois de criar, vamos usar ele no CloudFront. O acesso do CDN vai ser um acesso utilizando **Origin access control settings** (OAC). O painel vai pedir para criar um novo OAC, mas basta deixar com a estrutura que está que já nos serve. Depois teremos que mudar a policy do bucket.

Esse CDN não precisa de header, Origin shield nem nada disso.

Manteremos a compressão dos objetos para diminuir o tamanho e garantir a performance, teremos o redirecionamento HTTP to HTTPS, enquanto que o restante podemos manter o recomendado.

Por hora, vamos deixar o WAF inativo.

No Price class, vamos deixar a opção de _Use all edge locations_. Essa é a opção mais cara, mas garante uma maior compatibilidade em todo o mundo, dado que ele determina sozinho para qual CDN vai jogar de acordo com a região sendo acessada.

Utilizaremos HTTP/2 e /3.

Default root object será o index.html

E essas são as configurações que devem ser feitas na distribuição do CloudFront.

Agora, precisamos atualizar o bucket S3 que está sendo usado. É importante notar que ao criar o recurso do CloudFront, o aviso em amarelo nos dá a policy que deve ser aplicada dentro do bucket que está sendo usado, sendo necessário apenas clicar em copiar e poderemos colar dentro das permissions do bucket recém-criado. Dentro de **Permissions** do bucket, vamos colar o que o serviço do CloudFront nos proveu.

Na prática, o serviço do cloudfront vai poder buscar objetos com uma distribuição específica, garantindo a segurança dos conteúdos.

Apesar de já funcionar, temos um grande problema. O deploy não vai ser tão simples.

Olhando para o deploy antigo, estamos usando o bucket Sync files to S3 apontando para o bucket. Mas quando estamos lidando com o CDN, o CloudFront tem cache. A cada deploy, temos que invalidar o cache. Dentro da opção de **Invalidations**, podemos criar uma invalidação com /\* para invalidar todo (é possível especificar). Essa funcionalidade também tem de ser invalidada via pipeline para que tudo corra bem:

## TODO

- Trocar o endpoint de localhost:3333 para o endereço do backend

> Na configuração do CloudFront, fizemos configurações de acesso público mas o bucket não é. No final das contas isso acaba sendo um ganho de segurança dado que o CloudFront vai ser o único a ser possível de ser acessado.
