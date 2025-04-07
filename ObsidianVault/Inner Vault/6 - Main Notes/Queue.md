
#General 

Basically, queues are one way of asynchronous communications. They can be used as a strategy for decoupling applications and maintain cross-communications among them.

Queues basically functions this way:

```mermaid
graph TD;
	ProducerA--Send messages-->Queue
	ProducerB--Send messages-->Queue
	ProducerC--Send messages-->Queue
	ConsumerA--Pool messages-->Queue
	ConsumerB--Pool messages-->Queue
	ConsumerC--Pool messages-->Queue
```

- **Producer**: responsible for sending messages that will be used for communication across applications.
- **Queue**: stores the message to be consumed
- **Consumer**: consumes from the queue