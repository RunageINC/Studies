
#JavaScript

Site oficial: [Webpack](https://webpack.js.org/)

Faz um bundle de todos os arquivos javascript, e outros formatos também, convertendo tudo para arquivos únicos de um tipo (um único css, um único js, etc).

Importante para os browsers mais antigos por conta do funcionamento dos ECMAScript Modules. Até então, os browsers não tinham suporte para os ES Modules com as keywords de import/export, portanto não havia um mapeamento correto desses arquivos. 

O webpack então permite fazer uma junção de todos os arquivos em um apenas, para que os scripts funcionem da maneira correta na hora de deixar uma build produtiva.