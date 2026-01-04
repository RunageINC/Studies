
O hook useMemo() ajuda em problemas de recalculos complexos. Usa uma técnica de memoize, que consiste em gravar o resultado de uma função e verificar se ela foi alterada ou não antes de realizar uma operação. No caso do React, ele vai sempre verificar se o valor mudou antes de performar uma renderização, fazendo com que em caso de não alteração o código de execução complexa não re-execute.

No JavaScript, as comparações são feitas por endereço de memória. Isso deve ser levado em conta no desenvolvimento para não causar comportamentos inadequados como por exemplo executar códigos que não sofreram alterações. O useMemo também ajuda nos casos de objetos que são criados em meio ao código de página, para previnir as renderizações indevidas.

Para funções, usamos o useCallback() que é criado especificamente para isso. Esse hook pega a função como um todo e faz a memoização dele.

A forma de abordar a performance não deve ser prematura, e sim remediativa. Abusar dos hooks acima, por exemplo, faz com que um espaço em memória seja separado previamente, causando um tradeoff bem ruim para a aplicação em termos de consumo de memória.

A nível de componente, temos também a utilização do memo(). Esse hook é específico para componentes, quando entendemos alguma renderização indevida.