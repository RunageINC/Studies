
There are inumerous ways of creating lists on HTML. The most common are:

### Unordered lists

The unordered lists are lists created as bullet points. They can be nested for further sub items.

```HTML
<ul>
	<li>item 1</li>
	<ul>
		<li>subitem 1</li>
		<ul>
			<li>sub subitem 1</li>
		</ul>
	</ul>
	<li>item 2</li>
	<ul>
		<li>subitem 2</li>
		<ul>
			<li>sub subitem 2</li>
		</ul>
	</ul>
	<li>item 3</li>
	<ul>
		<li>subitem 3</li>
		<ul>
			<li>sub subitem 3</li>
		</ul>
	</ul>
</ul>
```

![[Unordered List Examples.png]]

### Ordered lists

Lists that has an order based on the number of items. Different from unordered lists, nested lists only receives different enumeration if specified by the attribute **type**. Those types can be:

- type="A" -> Turns into uppercase letters.
- type="a" -> Turns into lowercase letters.
- type="I" -> Turns into uppercase roman numerals.
- type="i" -> Turns into lowercase roman numerals.
- type="1" -> Turns into numbers.

There's another attribute called **start** that can be used to define which number will the list start.


```HTML
<ol>
  <li>item 1</li>
  <ol type="A" type="A">
	<li>subitem 1</li>
	<li>subitem 2</li>
	<li>subitem 3</li>
	<ol type="I">
	  <li>sub subitem 1</li>
	  <li>sub subitem 2</li>
	  <li>sub subitem 3</li>
	</ol>
  </ol>
  <li>item 2</li>
  <ol type="A">
	<li>subitem 1</li>
	<li>subitem 2</li>
	<li>subitem 3</li>
	<ol type="I">
	  <li>sub subitem 1</li>
	  <li>sub subitem 2</li>
	  <li>sub subitem 3</li>
	</ol>
  </ol>
  <li>item 3</li>
  <ol type="A">
	<li>subitem 1</li>
	<li>subitem 2</li>
	<li>subitem 3</li>
	<ol type="I">
	  <li>sub subitem 1</li>
	  <li>sub subitem 2</li>
	  <li>sub subitem 3</li>
	</ol>
  </ol>
</ol>
```

![[Ordered Lists Example.png]]