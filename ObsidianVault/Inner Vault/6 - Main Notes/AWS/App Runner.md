
Serviço simples de execução de containers. Dentro da criação do AppRunner podemos utilizar o código fonte diretamente ou rodar através de um Container Registry como o [[ECR]]. 

Também permite com que os deploys sejam automáticos ou manuais, e controlados através de uma role pelo [[IAM]] (dado que os serviços não tem acesso direto uns aos outros, necessitando passar pelo IAM)

Importante ressaltar que o App Runner precisa das variáveis e também possui configurações pra Health Check, segurança, Auto Scalling, etc. Também é possível criar [[VPC]]'s para o tráfego de rede.