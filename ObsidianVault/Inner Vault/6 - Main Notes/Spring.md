

Spring is an entire environment with many properties. For it to run smoothly, it creates an **Application Context**, also called *Spring Context*. This context not only creates the entire environment for the Spring apps to work properly but also creates the `Spring Beans`, objects that are built on the context of the application, using the [[Singleton]] pattern. Every single component created on spring, being it a Service, Controller, anything, becomes a Spring Bean. Annotations on spring creates a stereotype for that java object, so it can be properly mapped as a Repository, Service, Controller, etc. There are ways of getting even the application context:

```java
public static void main(String[] args) {
	ApplicationContext ctx = SpringApplication.run(ApplicationExample.class, args);

	ControllerExample controller = (ControllerExample) ctx.getBean("controllerExample");

}
```


## Dependency Injection (DI)

Every single dependency on Spring is injected by DI through constructors or setters:

```java
@Service
public class ServiceExample {
	private final RepositoryExample repo;

	public ServiceExample(final repo) {
		this.repo = repo;
	}
}
```

There's also another way of injecting which is by using `@Autowired` but it is not recommended for services/controllers as it can become difficult to mock those dependencies on unit tests.

Another annotation that helps a lot for those injections are the lombok `@RequiredArgsConstructor` and `@AllArgsConstructor` annotations.

DI can be done with concrete or abstract classes/interfaces. It is highly preferred to use it via interface as it allows the runtime to decide the implementation to inject and also makes the code more testable, following [[SOLID Principles]]  of Interface Segregation.

### Inversion of Control (IoC)

Allows the dependencies to be injected at runtime, meaning thta dependencies are not predetermined. The framework composes the application by controlling which implementation should be injected. A good example for this is the example of data source injection, being it a H2 in memory or MySQL.

#### Qualifiers, Primary and Beans

When having more than one implementation, we can use the `@Qualifier` annotation to define which implementation should we use in each concrete class. Given the following example:

```java
@Service
public class EmailNotificationService implements NotificationService {
    // Implementation
}

@Service
public class SMSNotificationService implements NotificationService {
    // Implementation
}
```

The issue generated here is that we have 2 concrete implementations of NotificationService. To solve this, we can actually qualify how we're going to use this:

```java
@Qualifier("emailNotificationService")
private NotificationService notificationService;
```

It is important to notice that every bean is camel case with the starting letter being lower case.

When there's no Qualifier present, we can use the `@Primary` annotation on a component so it can be used as a primary source of injection.

```java
@Primary
public class EmailService implements NotificationService{}
```

### Profiles

Profiles can be used to control Spring injections and configurations. It can be set in two ways: using the application.properties or application.yml or by using an environment variable:

`SPRING_PROFILES_ACTIVE=development`

```yaml
spring:
  profiles:
    active: development
```

Also there are services that can be specifically injected by using the profile annotation:

```java
@Primary
@Profile("Production")
public class EmailService implements NotificationService{}
```

The @Profile annotation also has the possibility to be set as default, by passing this default property: `@Profile({"Production", "default"})`

### Bean Lifecycle

The creation of beans has a very defined lifecycle:

![[Bean Lifecycle.png]]

And also destruction:

![[Bean destroy cycle.png]]

Knowing the lifecycle, there are 2 interfaces that can be implemented for callback events:

- InitializingBean.afterPropertiesSet()
	- Called after properties are set
- DisposableBean.destroy()
	- Called during bean destruction in shutdown

There's also 2 hooks that can be used:

- `@PostConstruct` - will be called after the bean has been constructed but before returned to the requesting object.
- `@PreDestroy` - Called just before the bean is destroyed by the container.

Another interface that can be implemented is the `BeanPostProcessor` interface, with those two methods:

- `postProcessBeforeInitialization` - called before bean initialization
- `postProcessfterInitialization` - called after bean initialization

There are over 14 aware interfaces to access the infrastructure of spring framework. Even though there's the possibility of the usage, those are rarely used by spring developers, with only very specific use-cases.


| Interface                      | Description                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| ApplicationContextAware        | Interface to be implemented by any object that wishes to be notified of the ApplicationContext that it runs in |
| ApplicationEventPublisherAware | Set the ApplicationEventPublisher that this object runs in                                                     |
| BeanClassLoaderAware           | Callback that supplies the bean class loader to a bean instance                                                |
| BeanFactoryAware               | Callback that supplies the owning factory to a bean instance                                                   |
| BeanNameAware                  | Set the name of the bean in the bean factory that created this bean                                            |
| BootstrapContextAware          | Set the BootstrapContext that this object runs in                                                              |
| LoadTimeWeaverAware            | Set the LoadTimeWeaver of this object's containing ApplicationContext                                          |
| MessageSourceAware             | Set the MessageSource that this object runs in                                                                 |
| NotificationPublisherAware     | Set the NotificationPublisher instance for the current managed resource instance                               |
| PortletConfigAware             | Set the PortletConfig this object runs in                                                                      |
| PortletContextAware            | Set the PortletContext that this object runs in                                                                |
| ResourceLoaderAware            | Set the ResourceLoader that this object runs in                                                                |
| ServletConfigAware             | Set the ServletConfig that this object runs in                                                                 |
| ServletContextAware            | Set the ServletContext that this object runs in                                                                |


## Traditional MVC

In traditional MVC, it is very common to return the view as a `Model` from the package `import org.springframework.ui.Model`. This can map the request on an attribute and return it as a JSON:

```java
@GetMapping
    public ResponseEntity<Model> getAllAuthors(Model model) {

        model.addAttribute("authors", authorRepository.findAll());

        return ResponseEntity.ok(model);
    }
```

This way, the response is going to be like this:

```json
{
    "authors": [
        {
            "id": 1,
            "firstName": "Alex",
            "lastName": "Anderson"
        },
        {
            "id": 2,
            "firstName": "Bob",
            "lastName": "Martin"
        }
    ]
}
```

However, for RESTful API's it is not very common, as it kind of kills the RESTful due to the return type not aligning well with RESTful API practices. Usually, it is better to return the data directly.


### Data Modelling

It uses [[JPA]] as a default modelling, and it uses the [[Repository]] pattern to access data from the database. To expose it on the MVC pattern, Spring uses [[6 - Main Notes/Controller]]s

## Thymeleaf

TODO: Study this just for funsies