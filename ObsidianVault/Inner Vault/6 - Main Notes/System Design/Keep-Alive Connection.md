
Tags: [[Reducing Latency]] [[System Design]]

### Introduction

The TCP handshake is a critical process to ensure connection health. It is always executed before starting data transmission. The system utilizes the TCP handshake as a way to ensure the connection is secure, it won't fail over some small issue, as it happens with other protocol structures.

However, this handshake is costly to the overall system performance, as it involves multiple round trips between client <-> server.

![[Keep-Alive example.png]]

The usage of keep-alive connections helps reducing this latency by pooling over already acknowledged connections, reusing them for data transmission and reducing the need of creating a new connection for transfer.