
#React

Uma lib para criação de apps [[6 - Main Notes/React/React|React]] de vários tipos. Utilizando o Node, facilita a criação de uma app em [[6 - Main Notes/React/React|React]] em vários aspectos, como por exemplo adicionando o TypeScript já nativamente para a app.

Utiliza dos ECMA Script Modules para criar os arquivos JS. Para criar um projeto o comando é:

`npm create vite@latest` (`latest` pode ser substituído por alguma versão específica do vite, caso seja necessário).

Assim como muitas libs de criação de apps no React, possui apenas 1 div **root**:

```html
<body>
	<div id="root"></div>
	<script type="module" src="/src/main.jsx"></script>
</body>
```

Vale notar que o script é utilizado como _type="module"_ por conta dos ECMA Script Modules.

