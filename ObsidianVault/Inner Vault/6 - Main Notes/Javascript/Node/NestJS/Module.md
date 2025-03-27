
#NestJS

For the controller to work properly, it should contai a module that maps the controller. Every application must have a module for wrapping controllers.

```typescript
@Module({
  controllers: [AppController],
})
class AppModule {}
```

Module decorators expect properties on it. We can pass the controllers so it can properly map. 

With Nest CLI, to generate a new module it is very simple:

`nest generate module <name>`