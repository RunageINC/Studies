
### Receiver

- [x] **Split receiver screen into 2**

- Basically when we login, we have receiver and send amount on the same step.
- It will be good to split those into 2 new steps. First the amount, then the receiver.
- When you split both receiver and amount it will break on the API. This will need attention
- Session requires both receiver and amount. We will have to refactor session to support partial form submissions. tRPC and Session is the hardest one.

- [x] Check if isHomeScreenEnabled is already on the backend. If not, check with the team about it.