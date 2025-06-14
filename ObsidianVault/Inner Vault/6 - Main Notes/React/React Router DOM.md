
Lib muito utilizada para criação de roteamento em apps SPA. Existem vários tipos de routing:

- Browser Router - usado no browser através de endereço. Mais usado em apps comuns

- Hash Router - Também usado no browser, mas não usa o endereço da página como caminho. Ao invés da pagina ser por exemplo localhost:5174/dashboard, o endereço sempre vai ser a primeira parte (localhost:5174) mas com um `#/pagina`, previnindo carregamentos. Muito utilizado antigamente, mas ainda encontra uso em hospedagens que não permitem muito controle para as URLs.

- Memory Router - Rota fica salva em memória, em uma variável. Em apps que não possuem endereço, essa rota é muito útil. 

### FIrst Steps

Antes de mais nada, após instalar o router dom, precisamos criar um tipo de roteamento que será usado. No caso, o mais usado é o Browser Router:

```typescript
import { createBrowserRouter } from "react-router";
import { Dashboard } from "./app/dashboard";
import { SignIn } from "./auth/signin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
```

Por debaixo dos panos, esse componente nada mais é do que um contexto, e deverá ser utilizado com um provider específico da lib também, chamado RouterProvider, dentro da App.tsx, que é nosso arquivo principal:

```typescript
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./pages/routes";

export function App() {
  return <RouterProvider router={router} />;
}
```

Esse provider é responsável por atualizar os conteúdos de acordo com cada rota que configuramos.

### Trabalhando com as rotas

Após criar uma rota, podemos definir layouts. Esses layouts são replicados em várias páginas e, assim como podemos envolver um componente com um maior utilizando o children, dentro da lib temos o componente `<Outlet />`. Esse componente descreve pedaços específicos da página. A lib de Router DOM vai injetar no Outlet tudo que for um filho daquela estrutura:

```typescript
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div>
      <h1>Header</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
```

Dentro do nosso router, teremos a seguinte estrutura:

```typescript
import { createBrowserRouter } from "react-router";
import { Dashboard } from "./app/dashboard";
import { SignIn } from "./auth/signin";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
```

Cada elemento children será injetado dentro do componente Outlet, como mencionado previamente, e ainda que os elementos "pai" possuam a mesma rota, a especificidade do elemento filho será levado em conta para decidir, nesse caso, qual Layout vai ser utilizado.