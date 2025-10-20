Responsividade é um termo muito utilizado no design de front end para garantir que um layout consiga responder a diversos tamanhos de tela.

Existem unidades do CSS importantes que podemos utilizar para comparação.

### vh
Calcula o tamanho total da tela e joga como altura da div. Isso significa que em alguns celulares, a altura toda da tela soma a barra de navegação e do próprio dispositivo, causando scroll. Não recomendado como medida para ambiente mobile.
### dvh

Se ajusta à tela. Caso o usuário minimize ou não a tela, ele vai acabar se ajustando.

### svh

Small Viewport Height. Traz o menor tamanho possível da tela. O maior problema com esse tipo de tamanho é que, se usarmos um background e o usuário decidir scrollar, o conteúdo não será coberto, causando falhas nos elementos postos em plano de fundo.

### lvh

Máximo viewport de uma tela. Ao usar um scroll de tela, as barras são minimizadas, fazendo com que o tamanho total fique maior. Porém, se o usuário não minimizou as barras de navegação e do dispositivo através do scroll, o comportamento de um lvh ainda considera o maior tamanho possível, podendo causar scroll indesejado.