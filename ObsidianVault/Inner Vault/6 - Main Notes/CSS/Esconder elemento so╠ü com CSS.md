É possível esconder um elemento utilizando apenas um CSS. No exemplo abaixo, temos uma seção de comentários que possui um botão.

Esse botão deve estar disponível somente quando o input de textarea estiver focado:

```css
.commentForm footer {
  visibility: hidden;
  max-height: 0;
}

.commentForm:focus-within footer {
  visibility: visible;
  max-height: none;
}
```

Sem foco:
![[Visibility hidden when not focusing.png]]

Com foco: 
![[Visible when focusing.png]]