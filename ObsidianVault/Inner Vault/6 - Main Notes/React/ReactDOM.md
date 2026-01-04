Integração do core do React com a DOM (Document Object Model), a representação do HTML através do JavaScript.

Quando importamos o DOM, estamos integrando o React para funcionar no browser. O ReactDOM permite criar objetos em tela a partir de um elemento raiz:

```javascript
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

```