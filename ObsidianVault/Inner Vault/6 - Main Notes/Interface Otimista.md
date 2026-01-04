
Quando fazemos uma requisição HTTP, especialmente em aplicações React, temos um pequeno delay entre a requisição completar e a interface de fato registrar o ocorrido.

Para algumas situações, esse tipo de comportamento (também conhecido como interface pessimista) é extremamente necessário. Por exemplo, ao fazermos um pix, queremos que o dinheiro apenas seja deduzido da conta caso tenha dado certo.

Mas em alguns outros cenários, onde as alterações são menores, e 99% das vezes tem chance de dar certo, não queremos que esse comportamento aconteça. Queremos que as alterações realizadas reflitam instantaneamente. Para evitar isso, podemos utilizar da interface otimista. 