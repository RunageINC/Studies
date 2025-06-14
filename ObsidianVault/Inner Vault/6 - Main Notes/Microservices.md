
An architectural pattern to separate services and let them become independent.

They are independent for deploying, scale and build.

Services are not separated only by modules. This is the first misconception of microservices.

Microservices are modeled through a domain concept (basically, [[DDD]]). People that speak in a similar manner belongs to the same business area. This is enough to produce a microservice. Those are usually where the boundaries are defined (therefore, [[DDD#Bounded Context|Bounded Context]] from DDD).

There are some advantages for using microservices:

- Specific languages for solving different problems, as microservices has their own layer. This also goes up to the database of choice and each separated techonology stack required.
- Distribution of computing resources.

Usually this architecture chioce is used by large companies when you have a huge team.

## Joining information between MS's

- We can use a BFF pattern or SAGA pattern for joins.

### Rules of Thumb

- One DB for each microservice
- Message Broker - async messaging concept. It can be a RabbitMQ or Kafka, or anything related. It will be used to communicate between MS's
- API Gateway - will be the bridge for communicating different api's or front-ends to microservices.
- Distributed tracing - an unique identifier (trace id, request id, etc) that will be used for identifying requests.
- Idempotency - avoid operations to repeat on async calls.
- Circuit Breaker - a proxy for detecting when a service or operations being done in a service are very slow.
- Federation - Many API's combined into one
- 

#### Problems

One of the most common problems is the operational overhead. Now, the CI/CD pipes must run for every single service. Everything must be dealt with several times.

Front-end 