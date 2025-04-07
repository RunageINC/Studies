
#aws

EC2 is one of the most popular AWS offerings. Used everywhere, it means Elastic Compute Cloud, and is the way to do IaaS on AWS.

This is not a one-way service. Instead, it is composed of many things at a high level, so it is possible to:

- Renting virtual machines (EC2 instances)
- Store data on virtual drives - EBS (Elastic Block Storage) volumes
- Distributing load across machines (ELB - Elastic Load Balancer)
- Scalling the services using an auto-scalling group (ASG)

Knowing how to use this service in AWS is fundamental to understand how the cloud works when using IaaS. 

## EC2 Sizing and Configuration

When configuring and sizing an EC2, there are some configuration options that can be set:

- **OS**: Linux, MacOS or Windows
- How much compute power and cores **(CPU)**
- How much random-acess memory **(RAM)**
- How much **storage space**:
	- Network-attached (EBS and EFS)
	- Hardware-attached (EC2 instance store)
- **Network card**: speed of the card, what kind of [[Private vs Public vs Elastic IP|public IP]]
- **Firewall Rules**: that is the security group.
- **Bootstrap Script**: cofnigure at first launch, called EC2 User Data

## EC2 User Data

It is possible to bootstrap the instances using an EC2 User Data script ([[Bootstrapping Data]]). This type of data is used to automate boot tasks such as:

- Installing updates
- Installing softwre
- Downloading common files from internet
- Anything used as a startup setup

All scripting on EC2 runs under root user, with sudo privileges.

## Types

There are a lot of instance types, but the most common/used are:


| Instance    | vCPU | Mem (GiB) | Storage          | Network Performance | EBS Bandwidth (Mbps) |
| ----------- | ---- | --------- | ---------------- | ------------------- | -------------------- |
| t2.micro    | 1    | 1         | EBS-Only         | Low to Moderate     |                      |
| t2.xlarge   | 4    | 16        | EBS-Only         | Moderate            |                      |
| c5d.4xlarge | 16   | 32        | 1 x 400 NVMe SSD | Up to 10 Gbps       | 4750                 |
| r5.16xlarge | 64   | 512       | EBS-Only         | 20 Gbps             | 13600                |
| m5.8xlarge  | 32   | 128       | EBS-Only         | 10 Gbps             | 6800                 |

> On the free tier, t2.micro is available for 750h per month (which basically means 1 entire month)
