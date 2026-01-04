
Tags: [[Reducing Latency]], [[System Design]]

### Introduction

Can be used together with caching, it leverages the content delivered to the place next to the request.

A CDN is a geographically distributed network of servers that works for content delivering to end users with high availability and performance.

![[CDN example.png]]

When an application utilizes a CDN, the server chosen for content delivering is the closest to the end user and not the origin one. If the content has been previously cached, it will return from the cache instead.

The distance reduction of the content traveling minimizes the response time.