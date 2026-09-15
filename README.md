# Commerce Landing

Base white label de landing pages para comércios e empresas. A mesma aplicação serve restaurante, barbearia, loja, clínica ou prestador de serviço — o que muda é configuração, conteúdo e tema, não a estrutura.

A identidade visual desta base chama-se **Vespera**: tipografia geométrica (Syne + Figtree), paleta quente injetada por cliente e componentes reutilizáveis no padrão do restante do ecossistema React (rotas centralizadas, `InputPadrao`, `CheckboxPadrao`).

## Tecnologias

- React 19
- Vite
- JavaScript
- React Router
- CSS Modules + variáveis CSS
- ESLint

## Como instalar

```bash
npm install
```

## Como executar localmente

```bash
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

O cliente de demonstração **Aurora Café** é o padrão (`VITE_CLIENT_ID=aurora-cafe`).

## Estrutura de pastas

```text
src/
├── assets/            imagens e ícones do cliente demo
├── components/        seções da landing + ui reutilizável
│   └── ui/            Button, Card, InputPadrao, CheckboxPadrao, Section…
├── config/            branding, tema, navegação e registro de clientes
│   └── clients/       um arquivo por cliente
├── data/              textos, listas e mídia
│   └── clients/
├── hooks/             useSite
├── layouts/           composição Header + seções + Footer
├── pages/             Home e NotFound
├── providers/         SiteContext (mesmo papel do AppProviders do ERP)
├── styles/            tokens e reset
├── theme/             aplica CSS variables em runtime
├── utils/             rotas, SEO, WhatsApp
├── App.jsx
├── Routes.jsx
└── main.jsx
```

## Como criar uma nova landing (novo cliente)

1. Copie `src/config/clients/aurora-cafe.js` e `src/data/clients/aurora-cafe.js`.
2. Ajuste `id`, dados de negócio, tema, SEO, navegação e `sections`.
3. Registre o cliente em `src/config/index.js`.
4. Defina o cliente ativo:

```bash
VITE_CLIENT_ID=nome-do-cliente
```

O contrato de um cliente é:

```js
{
  id: 'nome-do-cliente',
  config: { business, branding, theme, social, seo, navigation, features },
  content: { hero, about, services, products, gallery, highlights, testimonials, cta, contact },
  sections: ['hero', 'about', 'services', /* ... */]
}
```

Esse formato é o ponto de troca futuro para CMS, API ou painel administrativo. Nenhum componente de seção deve conhecer o nome do cliente.

## Como alterar identidade visual

Edite `config.theme` do cliente. As chaves viram variáveis CSS em runtime (`applyTheme`):

- `primaryColor` → `--color-primary`
- `accentColor` → `--color-accent`
- `fontDisplay` / `fontPrimary`
- raios e espaçamentos ficam em `src/styles/variables.css`

Logo e favicon ficam em `config.branding`.

## Como alterar conteúdo

Todo texto, lista, preço, depoimento e imagem de seção vive em `src/data/clients/{cliente}.js`. Os componentes apenas fazem `.map()` nesses arrays.

## Como adicionar um componente / seção

1. Crie `src/components/MinhaSecao/index.jsx` (e CSS module).
2. Leia dados com `useSite()`.
3. Registre a seção em `src/config/sections.js` (`sectionRegistry`).
4. Inclua o `id` no array `sections` do cliente.

Header e Footer ficam no layout, fora do registro, porque toda landing precisa deles.

## Rotas

O padrão segue o ERP / landing Ramozz:

- `App.jsx` → `AppProviders` + `BrowserRouter` + `ProjectRoutes`
- `Routes.jsx` lê `jsonRoute` em `src/utils/routes.js`

Novas páginas (política, cardápio interno, área logada) entram em `jsonRoute` e em `Routes.jsx`, sem espalhar `<Route>` pelos componentes.

## Preparado para evoluir (ainda não implementado)

- Múltiplos clientes no mesmo deploy (`VITE_CLIENT_ID` ou futuro hostname)
- Temas e layouts diferentes por cliente
- CMS / admin / API no lugar dos arquivos em `config/` e `data/`
- SEO individual (já isolado em `config.seo`)
- WhatsApp, formulário, analytics e domínio customizado

## Demonstração

Cliente: **Aurora Café** (fictício), Vila Madalena, São Paulo.
