
Tags: [[Reducing Latency]], [[System Design]]

### Introduction

Used in distributed systems to improve performance and reduce load on backend services.

The primary goal is to minimize costly DB lookups and avoid performing high-latency computations repeatedly. Not only used on DB's but also on API frequent returns.

Frequently accessed data is stored on cache and can be retrieved way faster than going all the way through an DB or API. 

They can be implemented using high-speed memory or fast storage systems with low-latency

![[Cache example.png]]