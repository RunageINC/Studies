
#JavaScript

Default Exports são exports utilizados com a keyword _default_, possibilitando nomear o arquivo importado no momento da importação, e não na exportação:

```javascript
function calculate(){...}

export default calculate;
```

```javascript
import Mathematics from './calculate'

Mathematics(); // É a funçõa calculate
```


Named Exports são exports utilizados na criação da função, tendo que ser importados com o nome exato da função:

```javascript
export function calculate(){...}
```

```javascript
import { calculate } from './calculate';

calculate();
```