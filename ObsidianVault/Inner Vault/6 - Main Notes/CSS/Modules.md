Quando utilizamos [[React]] para desenvolvimento, podemos utilizar a extensão `.module.css` para indicar que as classes CSS serão utilizadas como classes javascript.

Ex:

```javascript
import { header } from "./Header.module.css";

export function Header() {
  return (
    <header className={header}>
      <strong>Ignite Feed</strong>
    </header>
  );
}
```

Essa extensão permite a criação de módulos ECMA Script para serem utilizados juntamente com o código [[React]], aplicando as classes como se fossem objetos.