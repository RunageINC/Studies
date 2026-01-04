
### S - Single Responsibility Principle

A module/object must have only one reason to change. If a class does more than its job, it must be reviewed and separated into new classes. Can a Rectangle class create a circle?

```javascript
class Rectangle {
	constructor(length, width) {
		this.length = length;
		this.width = width;
	}

	get area() {
		return this.length * this.width;
	}

	createCircle() {
		// is this correct?
	}
}
```

### O - Open Closed Principle

Entities must be opened for extension but closed for modification.

```javascript
class Rectangle {
	constructor(length, width) {
		this.length = length;
		this.width = width;
	}

	get area() {
		return this.length * this.width;
	}

	get perimeter() {
		return 2 * (this.length + this.width)
	}
}
```

### L - Liskov Substitution Principle

Child classes can substitute and change behavior of parent classes.

```javascript
class CRUD() { 
//... lots of code
}

class SQLCRUD extends CRUD {
// ... lots of code and some changes
}
```

### I - Interface Segregation Principle

Interfaces should serve as a contract for what the implementing class must have.

### D - Dependency Inversion Principle

All dependencies of our classes must depend on abstractions instead of implementations. For example the Facade pattern.



##### TODO: READ

Clean Code JS: https://github.com/ryanmcdermott/clean-code-javascript

Exemplos: https://levelup.gitconnected.com/javascript-clean-code-solid-9d135f824180

https://dzone.com/articles/software-design-princip...

http://www.macoratti.net/15/12/net_yagni1.htm

https://en.wikipedia.org/wiki/Software_design_pattern

https://en.wikipedia.org/wiki/Anti-pattern

https://ezdevs.com.br/conhecendo-os-principios-do-solid/

https://en.wikipedia.org/wiki/SOLID

https://www.ibm.com/developerworks/library/j-ft10/index.html

https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa

https://hackernoon.com/understanding-solid-principles-in-javascript-w1cx3yrv

https://sourcemaking.com/antipatterns