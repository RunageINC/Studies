
#General 

Usado para processar textos a partir de padrões. Muito utilizado para replacement em palavras e comparações. 

Esse conceito está presente em basicamente todos os lugares, desde API's a IDE's. 

Sites para testes de regex: [Regex101](https://regex101.com)

#### Padrões

Todo caractér da expressão regular é chamado de dígito: 

`^\d{3}`

Debulhando essa regex:

- \d - representa o dígito
- {3} - representa a quantidade de caractéres
- ^ - início da linha

Alguns exemplos: 

##### 1.
`^\d{3}.\d{3}.\d{3}-\d{2}$.

Um regex que identifica um CPF através de seus padrões.
O **$** indica que o regex termina na linha. Para caracteres especiais:

\[. -] - identifica pontos e traços. Basicamente o bracket significa um OR.

##### 2.
`^(\w+),\s(\w+)$`

Esse regex pode pegar um nome separado por vírgula e espaço. Ex:

- Gomes, Arthur

Dessa forma, o (\w+) irá pegar todas as letras do primeiro match, separar em um grupo e guardar essa informação. Em seguida, temos uma vírgula e depois um \s que significa white spaces. Dessa forma, nosso regex separa em 2 grupos (ignorando a vírgula e o white space) o nosso conteúdo de texto.

##### 3.
`\[(.*?)\]\(([http|https].*?)\)`

Para o texto:

```text
O [Github](https://github.com) é um site de codificação. Permite acesso com o [Google](http://google.com), mas não permite conectar com o [Instagram](https://instagram.com).

Existem outros como o [Bitbucket](https://bitbucket.com) e até mesmo o [GitLab](https://gitlab.com)
``` 


**?** significa non-greedy, ou seja, inibe o regex de olhar o texto inteiro, buscando somente até o próximo delimitador.

É importante ressaltar que os grupos apesar de começarem do 1, existe o 0. O group 0 é atrelado ao full match.