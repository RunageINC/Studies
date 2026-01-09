# Sobre

Projeto criado através dos estudos da pós FTR da RocketSeat, com algumas alterações pessoais. Deve ser usado em conjunto com o projeto da mesma pasta `upload-server-web` (back-end) sendo esse o front-end. Esse projeto foi feito em Node v23 e Tailwind v4 e portanto possui algumas mudanças em relação ao projeto do curso referente a estilizações customizadas. Utiliza as seguintes dependências:

## Dev Deps

- Typescript
- ESLint (linting padrão do Vite)

## Deps

- React
- Vite (base e build do projeto)
- TailwindCSS v4 (estilização)
- Lucide-React (ícones)
- Tailwind Variants (criação de variantes dos componentes)
- Tailwind Merge (depedência do Tailwind Variants)
- Radix UI/React Collapsible (efeito de colapsável)
- React Dropzone (subir os arquivos)
- Radix UI/React Progress (barra de progresso)
- Motion (animações)
- Zustand (gerenciamento de estado)
- Immer (lidar com a imutabilidade do React)
- Axios (http requests)
- Radix UI/React Scroll Area

# Step-by-step guide

A criação do projeto foi com a configuração de Vite + React + TypeScript:

`npm create vite@latest`

As dependências instaladas foram:

`npm i tailwindcss @tailwindcss/vite lucide-react tailwind-variants tailwind-merge @radix-ui/react-collapsible @radix-ui/react-progress react-dropzone motion zustand immer @radix-ui/react-scroll-area`

## Projeto

Para uniformizar as letras e padrões de cor, foram adicionadas as classes `antialised bg-zinc-950 text-white` na tag body do `index.html`

O projeto foi estruturado de forma simples, sem muita arquitetura react somente com uma pasta de components que separa os conceitos.

A compatibilidade com diversas telas foi desenvolvida utilizando o recurso do CSS de `dvh`.

### Componentes Principais

Utilizam uma combinação de múltiplas bibliotecas como alguns componentes do Radix UI para colapsar e barra de progresso, react-dropzone para upload dos arquivos e o Motion para animações.

Para gerenciar os estados entre os componentes, foi utilizado a biblioteca `Zustand`. Haviam 2 possibilidades sendo elas o `Jotai` e o próprio `Zustand`. O Jotai compartilha o estado como pequenos átomos, estados menores compartilhados, enquanto que o Zustand compartilha um grande estado entre toda a aplicação para todos os componentes sendo que o componente decide qual estado utilizar. Foi escolhido o Zustand por ser mais amigável e fácil de usar e, apesar do Jotai ser um pouco mais completo, suas funcionalidades podem ser facilmente substituidas

`Zustand` é um bom replacement pro Redux.

#### upload-widget-title.tsx

Dinamicamente muda conforme o estado de colapsado ou não. Possui uma classe importante chamada `tabular-nums` do tailwind para normalizar o tamanho dos números via css.

#### upload-widget.tsx

Feito para armazenar todos os componentes, a ruler de divisão possui um box-content para que as linhas fiquem por cima dos elementos e não escondida. Utiliza do Radix React Collapsible para criar o efeito de colapso do componente como um todo, alterando seu header de forma condicional.

É animado com os hooks e métodos do Motion. A borda animada foi criada sobrescrevendo o angulo da borda com o `@property`. Estamos usando a sintaxe de ângulo (por isso `<angle>`) para animar tudo. Composto de alguns outros componentes como o `upload-widget-dropzone.tsx`, `upload-widget-header.tsx`, `upload-widget-minimized-button.tsx`, `upload-widget-title.tsx` `upload-widget-upload-item.tsx` e `upload-widget-upload-list.tsx`

#### upload-widget-dropzone.tsx

Utiliza da biblioteca React Dropzone para estabelecer o upload do arquivo. Se aproveita também das funções de upload do Zustand, localizadas no `store/uploads.ts`

Também utiliza dos hooks de pending uploads e de use uploads para exibir os dados.

#### upload-widget-upload-item.tsx

Responsável por informar o estado de cada upload, utiliza uma função de Math.max para previnir com que o axios informe que mais bytes foram enviados do que o normal.

#### upload-widget-upload-list.tsx

Utiliza do react scroll area do Radix UI para oferecer um scroll customizável.

### Componentes Compartilhados

Alguns componentes foram criados para serem compartilhados entre múltiplos componentes principais.

#### button.tsx

Criado usando o tailwind-variants, recebe todas as props de um button comum mas com pequenas variações em seu estilo auxiliados pela lib.

### Store (estado compartilhado)

#### upload.ts

Compartilha o estado através do Zustand. Os ID's dos uploads são gerados do lado do front dado que não há possibilidade de o back já ter criado o elemento caso alguma ação ocorra no meio do upload. Esses uploads são mapeados com um `Map<string, Upload>` para referenciar, através de um objeto, os uploads por seus ID's.

No Zustand, o próprio hook do create vai devolver a.

O set do Zustand pode substituir o estado completamente ou parcialmente, com a mesma sintaxe do setState, através de um callback: `(state => { ...state, newThing })`. O ideal é que o estado seja alterado parcialmente dado que o zustand pode sofrer com o mesmo comportamento de closures do useState padrão, onde um estado não está completamente refletido em seu estado atual no momento da atualização.

Para extrair a lista dos uploads, foi utilizado uma sintaxe um pouco diferente:

```typescript
const uploads = useUploads((store) => store.uploads);

//ao invés de

const { uploads } = useUploads();
```

Dessa forma, caso o estado de useUploads sofra alterações, o componente que está chamando a lista não irá sofrer uma renderização, garantindo sua imutabilidade com relação ao conteúdo escolhido. Caso a segunda forma de extração fosse escolhida, o componente poderia sofrer com múltiplas renderizações.

Dado que as informações no React são imutáveis, o Immer foi utilizado para auxiliar na troca dos valores. A cada troca de valores, o valor anterior deve ser passado somado ao posterior. No caso desse projeto, como estamos lidando com um array de uploads, a única forma de manter os valores correspondentes seria através do array como um todo: `return { uploads: [...state.uploads, novaInfo] }`. Com o Immer, essa necessidade é removida dado que o cálculo da alteração fica por conta da biblioteca.

Dentro do arquivo de `uploads.ts`, pode-se perceber que ele foi utilizado como uma espécie de middleware dentro do controle de estado do `Zustand`. Vale ressaltar que precisa do `enableMapSet()` do próprio immer, dado que o mesmo não tem suporte nativo a maps e sets. Esse método também atua como uma espécie de middleware.

Com o immer, podemos alterar diretamente os valores dos estados como um map comum.

Há um método de atualização auxiliar que ajuda a previnir erros de UI dado a rápida atualização e limpeza dos estados.

Outro hook importante criado nesse arquivo é o usePendingUploads. Esse hook cuida de calcular quantos uploads ainda estão pendentes e trazer um percentual global de progresso desses uploads, para preencher a parte maior do dropzone.

### Utilitários

#### compress-image.ts

Utiliza do FileReader nativo para ler a imagem aos poucos. Essa função através do evento de load constrói uma imagem comprimida. Como temos certeza de que uma imagem será lida, pode-se forçar o resultado através do as string.

Dentro do JavaScript, para redimensionar uma imagem utilizamos do canvas. Esse canvas é criado através do createElement da lib de document, utilizando da altura e largura da imagem para começar o processo de comprimir

Após gerar a nova imagem com o canvas, vamos converter para um blob, que é uma representação binária do arquivo, para reconstruir o arquivo e enviar para o back.

### HTTP

#### upload-file-to-storage.ts

Função que trata de fazer os uploads via form data com o axios e devolver uma url.

O cancelamento é feito através de um Abort Signal. Através de um opts que é opcional, podemos cancelar uma requisição com o Abort Signal no axios. Esse signal pode ser passado pra fetch tbm, não somente pro axios.

Cada upload possui um Abort Controller para enviar esse sinal de cancelamento, através do método `abort()`.
