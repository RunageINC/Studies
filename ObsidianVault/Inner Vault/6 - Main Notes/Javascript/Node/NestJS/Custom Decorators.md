
#NestJS

To create custom [[Decorators]] on Nest (it will required for example to export a validation logic), it is rather simple:

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    return 'hi there!';
  },
);

```

The most important thing here is the method `createParamDecorator`. This method right here will be able to create a decorator for us that can receive params, by receiving 2 things: data and context.

Data is annotated with the type `never`. It means that our CurrentUser decorator does not need any argument.

The context is important because this decorator can be used for anything: [[Web Sockets]], [[gRCP]] calls, [[HTTP Requests]], anything. That's why it is called context and not request.
