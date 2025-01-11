
Tags: [[Reducing Latency]], [[System Design]]

### Introduction

When dealing with long-running tasks in a distributed system, the user experience can be affected by the overall system responsiveness. Some tasks can take too long to execute and end up providing a bad experience for the end user.

Asynchronous processing is a powerful technique that allows the system to quickly respond to the user while non-blocking tasks are executing. With async processing, those non-blocking tasks, that are not required for the end response, are executed in parallel with other tasks.

![[Async processing example.png]]

There are some usual steps for this:

- The user initiates a long running task
- System responds with an indication that the task is being processed
- The task, behind the scenes, is queued into a queue or task queue
- A separate worker process or a pool of worker processes continuously monitor this queue. The tasks are picked as those same workers becomes available
- All the tasks are executed in parallel to each other, not blocking the system

