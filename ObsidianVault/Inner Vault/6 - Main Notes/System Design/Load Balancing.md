
Tags: [[Reducing Latency]] [[System Design]]

### Introduction

Super important technique to distribute workload between multiple machines.

It distributes the traffic so no server becomes overloaded with requests. The system ends up performing as the user expects.

The load ballancer acts as the initial point of contact, intelligently routing the request received to one of the available servers based on predefined algorithms or policies.

![[Load balancer example.png]]

There are some algorithms used for creating the load balancing logic:

- [[Round Robin]]
- [[Least Connections]]
- [[IP Hash]]