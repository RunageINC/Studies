# Por que 256 IPs não são suficientes para uma VPC?

Resposta curta: **porque os IPs acabam muito mais rápido do que parece quando você considera o funcionamento real de uma VPC na AWS.**

Abaixo está a explicação completa, com foco em **AWS**.

---

## 1. `/24 = 256 IPs` é apenas o máximo teórico

Uma VPC (ou subnet) com CIDR `/24` possui **256 endereços IP no total**, mas **nem todos são utilizáveis**.

Na AWS, **5 IPs por subnet são sempre reservados**:

1. Endereço da rede
2. Gateway da VPC
3. DNS da AWS
4. IP reservado para uso futuro
5. Endereço de broadcast

➡️ **IPs utilizáveis em uma subnet `/24`: 251**

Ou seja, o número real já começa menor.

---

## 2. Subnets reduzem ainda mais o espaço

Na prática, uma VPC quase sempre é dividida em **múltiplas subnets**:

- Subnet pública
- Subnet privada
- Uma de cada por **Availability Zone (AZ)**

Exemplo comum com **2 AZs**, usando um `/24`:

| Subnet      | CIDR | IPs utilizáveis |
| ----------- | ---- | --------------- |
| Pública AZ1 | /26  | ~59             |
| Privada AZ1 | /26  | ~59             |
| Pública AZ2 | /26  | ~59             |
| Privada AZ2 | /26  | ~59             |

Você já fica **limitado antes mesmo de rodar qualquer workload**.

---

## 3. Tudo consome IP na VPC

IPs não são usados apenas por EC2.

Na AWS, IPs são consumidos por:

- EC2 (instâncias)
- Load Balancers (ALB / NLB)
- NAT Gateway
- RDS / Aurora
- EKS (nós e **pods**)
- ENIs (Elastic Network Interfaces)
- Bastion hosts
- VPN / Client VPN
- Endpoints de VPC

### ⚠️ Kubernetes (EKS) consome IPs muito rápido

Usando o **AWS VPC CNI**:

- Cada **pod recebe um IP da VPC**
- Cada nó cria múltiplas ENIs

Exemplo simples:

- 10 nós
- 30 pods por nó  
  ➡️ **300 IPs necessários**

Um `/24` simplesmente **não comporta isso**.

---

## 4. Auto Scaling exige folga

Ambientes AWS **precisam de IPs livres** para funcionar corretamente:

- Auto Scaling Groups
- Rolling deployments
- Blue/Green deployments
- Atualizações sem downtime
- Failover entre AZs

Se o espaço de IP ficar cheio:

- Novas instâncias **não sobem**
- Pods ficam em `Pending`
- Deploys falham
- O ambiente quebra

---

## 5. Redimensionar depois é difícil (ou impossível)

Esse é o erro mais caro.

- ❌ Não é possível reduzir o CIDR de uma VPC
- Expandir depois exige:
  - CIDR secundário
  - Ajustes de rota
  - Limitações de serviços
  - Complexidade operacional
  - Possível downtime

Uma VPC pequena vira **dívida técnica permanente**.

---

## 6. Regra de ouro na AWS

Boas práticas de arquitetura recomendam:

- **Tamanho mínimo de VPC:** `/20` (4096 IPs)
- Tamanhos comuns:
  - `/20` → ambientes pequenos
  - `/18` → médio porte
  - `/16` → produção / plataformas compartilhadas

Isso garante:

- Múltiplas AZs
- Crescimento futuro
- Segurança para EKS
- Menos retrabalho

---

## Modelo mental correto

Pense em IP como **espaço em disco**, não como memória RAM:

> Você nunca projeta pensando só no uso atual.

Um `/24` parece suficiente no início, mas quebra assim que você adiciona:

- alta disponibilidade
- orquestração
- escalabilidade
- serviços gerenciados da AWS

---

## Resumo

✅ `/24` funciona apenas para:

- testes locais
- labs muito simples
- ambientes descartáveis

❌ `/24` **não é adequado** para:

- produção
- EKS
- auto scaling
- ambientes multi-AZ
