Seleciona todo elemento que possui um elemento antes. Se o elemento for o primeiro da lista, ele não é estilizado.

Ex: 
```css
div + div {
	background-color: blue;
}
```

![[element + element.png]]

Se houverem novos *div*s, serão estilizados também pois cairão na regra de conter um elemento anterior a ele.

