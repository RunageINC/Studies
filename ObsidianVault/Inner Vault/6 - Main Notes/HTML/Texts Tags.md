
The language has a lot of tags for create different types of text. Below is a cheat sheet with examples:

### Paragraph element

The most basic tag. Occupies the whole line on the page. Two paragraph tags will be placed one after the other on the webpage.

```HTML
<p>This is a paragraph text.</p>
```

![[Paragraph Example.png]]

```HTML
<p>This is a paragraph text.</p>
<p>This is another paragraph text.</p>
```

![[Paragraph Second Example.png]]

It does not matter if they're side by side or not.

### Heading elements

Those elements are divided into 6 sizes and occupies an entire line on the HTML canvas. Each written by using **h** and a number:

```HTML
<h1>Heading 1</h1>
<h2>Heading 1</h2>
<h3>Heading 1</h3>
<h4>Heading 1</h4>
<h5>Heading 1</h5>
<h6>Heading 1</h6>
```

![[Headings Example.png]]

### Anchor tags

Anchor tags creates a link, an anchor (also called hypertext reference), to somewhere. This link can also be a # so it redirects to nowhere. Once clicked and memorized by the browser, it becomes purple in color. Those links does not occupy an entire line, having its box based on the size of the written text.

```html
<a href="1">Unclicked link</a>
<a href="#">Clicked link</a>
```

![[Anchor Tag Example.png]]

Anchor tags can have an attribute called _target_ that tells the browser how to open a new tab. There are four values that this attribute can have, which are: 

- blank -> Opens the link in a new tab or window
- self -> Opens the link in the same tab/window. Default option
- parent -> Opens on the parent frame of the actual frame, if the html document is embedded on the iframe
- top -> Opens the link on a main window, removing existing frames.

```HTML
<a href="https://www.exemplo.com" target="_blank">Acesse o site de exemplo</a>
```


### Time

Allows a property of datetime to inform the user which exact time was the content made when hovering over the text when using the attribute *title*:

```HTML
<time title="11 de maio às 08:00" datetime="2022-05-11 08:00:00">Publicado a 1 hora</time>
```

![[Time tag title label.png]]