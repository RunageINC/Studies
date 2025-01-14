
JPA is the Java Persistence API. It is a specification that Hibernate wrote and under the covers, we will still use Hibernate. Also known as a framework for [[ORM]]

It is based on POJO's (Plain Old Java Objects)

Before persisting it on the database and making the POJO a fully fledged JPA entity, it is necessary to give it an ID.

The persistence API currently is under the **jarkata** persistence package. It was under **javax** package before.

Important annotations for Hibernate JPA:

- <span style="color: #9fad05">@Entity</span> → Annotates the POJO to be mapped as an entity by hibernate, on our DB. 
 
The above annotation must be used on class declaration:

```java
@Entity
public class Author { 
	//... code
}
```

- <span style="color: #9fad05">@Id</span> → Indicates which field is going to be used as an identificator on DB.
- <span style="color: #9fad05">@GeneratedValue</span> → The primary key generation strategy that the persistence provider (hibernate for example) must use to generate the annotated entity primary key. It is an optional property and used when we want to explicitly indicate it. The strategies are: 
	- **TABLE** → The database must use a table to ensure uniqueness (for example a table called `hibernate_sequences`)
	- **SEQUENCE** → The database must assign a sequence column. It can be used together with another annotation called <span style="color: #9fad05">@SequenceGenerator</span>, that defines how's the sequence is going to be: 
	  `@SequenceGenerator(name = "employee_seq", sequenceName = "employee_sequence", allocationSize = 1)`
	- **IDENTITY** → The database must assign an identity column. Typically used with MySQL and SQL server that has the ID identifiers (the **AUTO_INCREMENT** mecanism).
	- **UUID** → The database must use an UUID. Can be used together with another annotation called <span style="color: #9fad05">@GenericGenerator</span> to enable a custom generator:
	  `@GenericGenerator(name = "uuid", strategy = "uuid2")`
	- **AUTO** → The database is going to define how's the ID is going to work

The above annotations must be used on properties:

```java
@Entity
public class Author {
	// different ID's:

	/ ** Table type */
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;

	/ ** Sequence type */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "employee_seq", sequenceName = "employee_sequence", allocationSize = 1)
	private Long id;

	/ ** Identity type */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/ ** UUID type */
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	/ ** Auto type */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
}
```


## Relationships

The relationships on entities can be mapped into many ways. 

### Many to Many

This relationship is annotated by <span style="color: #9fad05">@ManyToMany</span> and is one of the most complexes one because the setup is a lot more than just this. This annotation refers to an _N:N_ relation on the database.

It requires another annotation called <span style="color: #9fad05">@JoinTable</span>. This annotation defines how the relation is going to be handle, by which columns and which table. The setup for each is defined by the following structure:

Supposing that we are dealing with many books, written by many authors. We now have a N:N relationship with _book_ ↔ _author_
![[Many to Many relationship - Book and Author.png]]

Now, to set it up on the ORM, we have to use the following structure: 

```java
@Entity
public class Author {
	@Id  
	@GeneratedValue(strategy = GenerationType.AUTO)  
	private Long id;

	@ManyToMany(mappedBy = "authors")  
	private Set<Book> books;
}


@Entity
public class Book {
	@Id  
	@GeneratedValue(strategy = GenerationType.AUTO)  
	private Long id;

	@ManyToMany
	@JoinTable(name = "author_book", joinColumns = @JoinColumn(name = "book_id"),  
	        inverseJoinColumns = @JoinColumn(name = "author_id"))  
	private Set<Author> authors;
}
```

The most important on the _JoinTable_ is the name of the table, mapped by the *name* (in which we are using `author_book`), the join column from the owner side of the relationship (in this case, the book is the owner so we are mapping the `book_id`) and the inverse join column from the side that does not own it (the `author_id`). It is important to notice that the <span style="color: #9fad05">@ManyToMany</span> on the Book side does not have the table name. It happens because it is not necessary as it is being mapped by the <span style="color: #9fad05">@JoinTable</span> annotation.