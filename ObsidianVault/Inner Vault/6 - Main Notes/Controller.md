
As part of MVC model, the Controller is the responsible for sending data through the internet, serving as an interface for accessing data from an API.

Controllers are present on every single web application, serving a route for the web.


### Spring MVC Controller

On the Spring framework, controllers are annotated with the `@Controller` annotation and the `@RequestMapping` annotation. This mapping annotation can be used both on class level and on method level.

```java
@RequestMapping("/authors")
public class AuthorController 
```

When `@RequestMapping` is on controller level, it will apply the mapping for all the methods. 
