
It is a markup language which stands for _HyperText Markup Language_.

HTML is just about marking up a document with simple things like headings, divs, paragraphs, etc. Can be seen as the skeleton of the page.

It was created in 1980 to help describe academic papers over the phone. 

To better define how the text would go with formatting, the HTML was created around tags, with a tag to open and a tag to close, semantically indicating what it represents.

Over the time, the markup language grew and became more human-readable.

Below, there's an example of what an HTML page look like:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Document</title>
</head>
<body>
	<p>
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Labore quae
	quasi,</strong> tenetur quas magnam odit accusantium <i>quisquam praesentium nam,
	accusamus</i> explicabo dignissimos cumque blanditiis, eveniet error ea
	possimus ducimus.
	</p>
</body>
</html>
```

The end result would be:

![[HTML Page Example.png]]

- [!] It is important to note that almost every single HTML tag occupies an entire line, with a few exceptions such as span, div, i, strong (which was _b_ on the past). 

## HTML Boilerplate

Before creating anything, HTML has a boilerplate to actually be valid as an html document. For that to be valid, it must contain the **html** tag with which language it is written, a **head** tag that has metadata such as the charset, viewport, content, tags that references scripts and styles and the title and the most important tag: the **body** tag that holds all the markdown language.

On recent IDE's, it has a shortcut such as _html:5_, that generates the entire boilerplate automatically.

Also, to comment on an HTML file, we use the following semantic so it won't be rendered on the browser:

```HTML
<!-- comment on html -->
```