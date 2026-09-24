# Scroll-Driven Coffee Animation - Aurora Café Hero

## Overview

Um componente React que implementa uma animação scroll-driven no Hero do Aurora Café. Conforme o usuário faz scroll na página, um bule de café derrama café em uma xícara, criando uma experiência imersiva e engajante.

## Arquivos Criados

### 1. **ScrollAnimatedCoffee.jsx** (`src/components/Hero/ScrollAnimatedCoffee.jsx`)
Componente principal que gerencia a animação.

**Funcionalidades:**
- Detecta scroll da página usando `useEffect`
- Calcula progresso (0-1) baseado na posição do hero na viewport
- Usa `requestAnimationFrame` para performance otimizada
- Respeita `prefers-reduced-motion` para acessibilidade
- Graceful fallback com `<noscript>`

**Performance:**
- GPU acceleration via `transform3d`
- `will-change` para otimizar rendering
- Passive scroll listeners
- AnimationFrame para throttle

### 2. **CoffeePourSVG.jsx** (`src/components/Hero/CoffeePourSVG.jsx`)
SVG animado com bule e xícara.

**Componentes SVG:**
- **Xícara**: Corpo branco com alça, preenchida progressivamente com café
- **Bule**: Laranja (color-accent), com bico e alça
- **Gotas**: Animadas durante o derramamento
- **Preenchimento**: Gradiente de café brown
- **Espuma**: Crema com pattern quando xícara está cheia

**Features:**
- Clipping path para derramamento realista
- Gradientes e shadows para profundidade
- Responsive scaling
- Acessível com `aria-label`

### 3. **scrollAnimatedCoffee.module.css** (`src/components/Hero/scrollAnimatedCoffee.module.css`)
Estilos CSS otimizados para performance.

**Estilos:**
- Container com gradiente de fundo sutil
- SVG wrapper com `will-change` e GPU acceleration
- Animação de entrada (fadeInScroll)
- Responsive: Mobile (300px min), Tablet (500px), Desktop (600px+)
- Fallback message para sem JavaScript
- Dark mode support
- Media query para `prefers-reduced-motion`

### 4. **Atualizado: Hero/index.jsx**
Integração do ScrollAnimatedCoffee no layout existente.

- Substitui imagem estática por animação
- Mantém toda a estrutura de conteúdo (título, descrição, CTAs, métricas)
- Envolvido em Reveal component para fade-in
- Responsive grid layout

## Como Funciona

### 1. Detecção de Scroll
```javascript
// Calcula quando o hero entra/sai da viewport
const distanceFromTop = windowHeight - containerTop;
const totalScrollDistance = containerHeight + windowHeight;
let progress = distanceFromTop / totalScrollDistance; // 0 a 1
```

### 2. Animação do SVG
```javascript
// CoffeePourSVG recebe progress (0-1)
<CoffeeSVG pourProgress={displayProgress} />

// SVG calcula:
const cupFillHeight = Math.min(pourProgress * 100, 85); // Café até 85%
const foamHeight = Math.max(pourProgress * 100 - 85, 0); // Espuma acima
```

### 3. Renderização
- SVG usa `clipPath` para cortar o preenchimento ao formato da xícara
- Rect animada se expande verticalmente com base no progress
- Gotas aparecem/desaparecem durante derramamento
- Espuma aparece quando progresso > 85%

## Acessibilidade

### Respeita Preferências do Usuário

1. **prefers-reduced-motion**
   - Desabilita animação de entrada
   - Vai direto ao 100% de preenchimento
   - Remove drop-shadow

2. **JavaScript Desabilitado**
   - Mostra mensagem descritiva em `<noscript>`
   - Estrutura HTML válida e acessível

3. **Aria Labels**
   - SVG tem `role="img"` e `aria-label`
   - Descrição: "Bule derramando café na xícara"

## Performance

### Otimizações Implementadas

1. **GPU Acceleration**
   ```css
   transform: translate3d(0, 0, 0); /* Force GPU */
   will-change: transform, opacity;
   ```

2. **Efficient Rendering**
   - Scroll listener é `{ passive: true }`
   - Usa `requestAnimationFrame` para throttle
   - SVG usa `shape-rendering: geometricPrecision`

3. **Layout Containment**
   ```css
   contain: layout style paint;
   ```

4. **No Expensive Operations**
   - Não recalcula layout (no reflow)
   - Apenas transform + opacity changes
   - Math cálculos ocorrem apenas em RAF

### Bundle Size
- Sem dependências adicionais (GSAP, Framer Motion)
- SVG inline (não é imagem externa)
- CSS Module scope-isolated
- ~10KB gzipped total para os 3 arquivos

## Responsividade

### Mobile (< 480px)
- Container: 300px min-height
- SVG max-width: 350px
- Padding reduzido

### Tablet (768px - 1023px)
- Container: 500px min-height
- SVG max-width: 500px

### Desktop (1024px - 1439px)
- Container: 600px min-height
- SVG max-width: 550px
- Lado a lado com conteúdo textual

### Extra Large (1440px+)
- Container: 700px min-height
- SVG max-width: 600px

## Integração no Projeto

### Mudanças Realizadas

1. **Hero/index.jsx**
   - Import de `ScrollAnimatedCoffee`
   - Substituição de `<img>` por componente

2. **Hero/styles.module.css**
   - Ajuste em `.visual` para `overflow: visible`
   - Adição de `will-change` e `contain`

### Nenhuma Dependência Adicionada
Projeto continua com as mesmas dependências:
- React 19.1.1
- React Router 7.8.2
- Leaflet 1.9.4

## Testing

### Manual Testing Checklist
- [ ] Scroll na página e observe o café sendo derramado
- [ ] Ao final do scroll, xícara deve estar cheia com espuma
- [ ] Teste em mobile: scroll mais rápido, animação responsiva
- [ ] Teste com `prefers-reduced-motion: reduce` habilitado
- [ ] Desabilite JavaScript e veja fallback message
- [ ] Teste em navegadores modernos (Chrome, Firefox, Safari, Edge)
- [ ] Inspecione DevTools: sem janks, smooth 60fps

### Performance Monitoring
```javascript
// No DevTools:
// 1. Performance > Record
// 2. Scroll página
// 3. Observe: Transform + Composite frames apenas (sem Layout/Paint)
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12.2+
- Android Chrome 60+

Usa:
- requestAnimationFrame (suporte universal)
- matchMedia (suporte universal)
- CSS transforms (suporte universal)
- SVG + clipPath (suporte universal)

## Próximas Melhorias (Optional)

1. **Parallax adicional**
   - Bule rotaciona conforme scroll
   - Gotas têm movimento 3D

2. **Interatividade**
   - Click para resetar animação
   - Hover para saber % de preenchimento

3. **Variações**
   - Diferentes tipos de café (espresso, filtro, etc)
   - Animação de vapor saindo da xícara

4. **Analytics**
   - Rastrear quantos usuários veem 100% preenchimento
   - Tempo médio de scroll para encher xícara

## Troubleshooting

### Animação não funciona
- Verificar DevTools Console por erros
- Confirmar que o container tem altura no viewport
- Verificar se JavaScript está habilitado

### Animação lenta/janky
- Verificar DevTools Performance tab
- Desabilitar extensões do navegador
- Testar em modo incógnito

### Looks wrong em mobile
- Verificar viewport meta tag
- Testar em diferentes tamanhos com DevTools
- Confirmar que CSS media queries estão aplicadas

## Notas Técnicas

### Por que não usar GSAP ScrollTrigger?
- Projeto não tem GSAP instalado
- Solução nativa tem performance similar
- Sem dependência extra = bundle menor
- Mais controle fino sobre renderização

### SVG vs Canvas vs HTML
- SVG: Escalável, estilizável com CSS, bom para ilustrações
- Canvas: Performance mas mais complexo
- HTML: Limitado para este tipo de desenho

### requestAnimationFrame vs direct scroll listener
- RAF: Sincroniza com refresh rate (60fps)
- Throttle: Evita múltiplas updates por frame
- Passive listener: Melhora scroll performance

## Referências

- MDN: requestAnimationFrame
- MDN: matchMedia (prefers-reduced-motion)
- SVG Specs: clipPath
- CSS Specs: will-change
- Web Vitals: GPU acceleration
