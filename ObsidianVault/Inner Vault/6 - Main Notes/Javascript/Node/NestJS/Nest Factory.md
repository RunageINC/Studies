
#NestJS

Every application needs a bootstrap function (name is just a convention though), to properly set up the modules:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(3000);
}

bootstrap();
```

It creates an instance of the Nest app, so we can listen to a port and invoke the bootstrap function.

> OBS: When running from a scratch created nest app (not using nest CLI), the way to do it is `npx ts-node-dev src/main.ts`
