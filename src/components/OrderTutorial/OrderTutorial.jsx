import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './OrderTutorial.css';

const TOOLTIP_WIDTH = 340;
const GAP = 14;
const PAD = 8;
// Duração da montagem da Banoffee no véu (ver OrderTutorial.css); a tela só libera depois dela.
const ASSEMBLE_MS = 1500;

const COCOA = [[40, 56], [58, 60], [77, 53], [96, 59], [118, 55], [139, 60], [160, 54], [182, 58], [68, 64], [150, 65]];

// Fatia de Banoffee que se monta uma vez: base, doce de leite, banana, chantilly e cacau.
function BanoffeeBuild() {
  return (
    <svg className="order-tutorial__banoffee" viewBox="0 0 220 150" aria-hidden="true">
      <ellipse className="order-tutorial__plate" cx="110" cy="136" rx="100" ry="10" />
      <g className="order-tutorial__layer order-tutorial__layer--crust">
        <path d="M22 118h176v10a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" fill="#D9A55B" />
        <path d="M22 118h176v4H22z" fill="#C88E42" />
      </g>
      <rect className="order-tutorial__layer order-tutorial__layer--caramel" x="22" y="92" width="176" height="26" fill="#9A4F17" />
      <rect className="order-tutorial__layer order-tutorial__layer--banana" x="22" y="76" width="176" height="16" fill="#F6E7B0" />
      {[40, 72, 104, 136, 168].map((cx, index) => (
        <g key={cx} className="order-tutorial__coin" style={{ '--i': index }}>
          <circle cx={cx} cy="84" r="11" fill="#FBEFC4" stroke="#EBD58A" strokeWidth="2" />
          <circle cx={cx} cy="84" r="2.2" fill="#C9A85B" />
        </g>
      ))}
      <path
        className="order-tutorial__layer order-tutorial__layer--cream"
        d="M22 76V52c10-6 18 2 28-3s18 4 28-1 18 3 28-1 18 4 28 0 18 3 28-1 18 3 30 1v29z"
        fill="#FFFDF6"
        stroke="#F1E6CF"
        strokeWidth="1.5"
      />
      <g className="order-tutorial__layer order-tutorial__layer--cocoa" fill="#7A3A12">
        {COCOA.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
        ))}
      </g>
    </svg>
  );
}

function nextFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function waitForTarget(selector, timeout = 1400) {
  return new Promise((resolve) => {
    const started = performance.now();

    const tick = () => {
      const node = document.querySelector(selector);
      if (node) {
        resolve(node);
        return;
      }
      if (performance.now() - started >= timeout) {
        resolve(null);
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
  });
}

// Espera a animação de entrada do alvo (painel deslizando) terminar, para medir a posição final.
async function settle(node, timeout = 900) {
  if (!node?.getAnimations) return;
  const running = node.getAnimations().map((animation) => animation.finished.catch(() => {}));
  if (!running.length) return;
  await Promise.race([
    Promise.all(running),
    new Promise((resolve) => {
      window.setTimeout(resolve, timeout);
    }),
  ]);
}

function measure(node) {
  if (!node) return null;
  const rect = node.getBoundingClientRect();
  if (rect.width < 2 && rect.height < 2) return null;
  return {
    top: Math.max(8, rect.top - PAD),
    left: Math.max(8, rect.left - PAD),
    width: Math.min(rect.width + PAD * 2, window.innerWidth - 16),
    height: Math.min(rect.height + PAD * 2, window.innerHeight - 16),
  };
}

function placeTooltip(hole, height, viewport) {
  const width = Math.min(TOOLTIP_WIDTH, viewport.width - 24);
  const mobile = viewport.width < 720;
  let top;
  let left = hole
    ? hole.left + hole.width / 2 - width / 2
    : (viewport.width - width) / 2;

  if (!hole || mobile) {
    top = viewport.height - height - 16;
    left = (viewport.width - width) / 2;
  } else {
    const below = hole.top + hole.height + GAP;
    const above = hole.top - GAP - height;
    const beside = hole.left - GAP - width;
    if (below + height <= viewport.height - 12) top = below;
    else if (above >= 12) top = above;
    // Alvo alto (painel lateral): o cartão vai ao lado, centrado na altura.
    else if (beside >= 12) {
      left = beside;
      top = hole.top + hole.height / 2 - height / 2;
    } else top = Math.max(12, viewport.height - height - 16);
  }

  left = Math.min(Math.max(12, left), viewport.width - width - 12);
  top = Math.min(Math.max(12, top), viewport.height - height - 12);

  return { top, left, width };
}

// Enquanto a simulação está aberta, todo o resto da página fica inerte (sem clique, toque ou Tab),
// inclusive os painéis que o próprio tour abre depois (portais novos no <body>).
function lockPage(keep) {
  const touched = new Set();
  const apply = (node) => {
    if (node === keep || !(node instanceof HTMLElement) || node.inert) return;
    node.inert = true;
    touched.add(node);
  };
  Array.from(document.body.children).forEach(apply);
  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach(apply));
  });
  observer.observe(document.body, { childList: true });
  return () => {
    observer.disconnect();
    touched.forEach((node) => {
      node.inert = false;
    });
  };
}

export default function OrderTutorial({
  open,
  steps,
  onClose,
  title = 'Como fazer um pedido?',
}) {
  const labelId = useId();
  const rootRef = useRef(null);
  const measureRef = useRef(null);
  const nextRef = useRef(null);
  // Layout de cada passo calculado na preparação: { hole, box }.
  const layoutsRef = useRef([]);
  const [phase, setPhase] = useState('prepare');
  const [index, setIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [prepareRun, setPrepareRun] = useState(0);
  // O cartão só desliza entre slides; ao sair da preparação ele já nasce no lugar.
  const [glide, setGlide] = useState(false);

  const go = (update) => {
    setGlide(true);
    setIndex(update);
  };

  const step = steps[index] || null;
  const isLast = index >= steps.length - 1;
  const isFirst = index <= 0;
  const layout = layoutsRef.current[index];

  // Trava a página e o scroll durante toda a simulação.
  useLayoutEffect(() => {
    if (!open || !rootRef.current) return undefined;
    const unlock = lockPage(rootRef.current);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      unlock();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Preparação (uma vez por abertura): fixa a altura do cartão pelo passo mais longo e passa por
  // todas as telas, do último passo ao primeiro, guardando onde fica o destaque de cada uma.
  // Depois disso, trocar de slide só aplica o que já foi medido.
  useEffect(() => {
    if (!open) {
      setPhase('prepare');
      setIndex(0);
      layoutsRef.current = [];
      return undefined;
    }

    let cancelled = false;
    setGlide(false);
    // Durante a preparação as animações da página ficam desligadas (ver OrderTutorial.css):
    // os painéis já nascem na posição final e cada passo é medido assim que aparece.
    const root = document.documentElement;
    root.dataset.tourPrep = '';
    const startedAt = performance.now();
    const assembleMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ASSEMBLE_MS;

    (async () => {
      const cards = Array.from(measureRef.current?.children || []);
      const height = Math.ceil(Math.max(0, ...cards.map((card) => card.getBoundingClientRect().height)));
      setCardHeight(height);

      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const layouts = [];
      for (let i = steps.length - 1; i >= 0; i -= 1) {
        steps[i].onEnter?.();
        const node = await waitForTarget(steps[i].target);
        if (cancelled) return;
        if (steps[i].scroll) node?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
        await settle(node);
        if (cancelled) return;
        const hole = measure(node);
        layouts[i] = { hole, box: placeTooltip(hole, height, viewport) };
      }

      // Um quadro para o passo 1 assentar (painéis fechados) antes de devolver as animações.
      await nextFrame();
      if (cancelled) return;
      // Devolve as animações da página ainda atrás do véu, e só libera quando a Banoffee fica pronta.
      delete root.dataset.tourPrep;
      const remaining = assembleMs - (performance.now() - startedAt);
      if (remaining > 0) {
        await new Promise((resolve) => {
          window.setTimeout(resolve, remaining);
        });
      }
      if (cancelled) return;
      layoutsRef.current = layouts;
      setIndex(0);
      setPhase('ready');
    })();

    return () => {
      cancelled = true;
      delete root.dataset.tourPrep;
    };
  }, [open, steps, prepareRun]);

  // Troca de slide: só monta a tela do passo; posição e tamanho já vêm da preparação.
  useEffect(() => {
    if (!open || phase !== 'ready') return;
    const current = steps[index];
    current?.onEnter?.();
    if (current?.scroll) {
      document.querySelector(current.target)?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
    }
    nextRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phase]);

  // Se a janela mudar de tamanho, refaz a preparação.
  useEffect(() => {
    if (!open) return undefined;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        layoutsRef.current = [];
        setPhase('prepare');
        setPrepareRun((value) => value + 1);
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (phase !== 'ready') return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setGlide(true);
        setIndex((value) => Math.min(value + 1, steps.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setGlide(true);
        setIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onClose, phase, steps.length]);

  if (!open || !step || typeof document === 'undefined') return null;

  const ready = phase === 'ready' && layout;
  const hole = ready ? layout.hole : null;
  const fallbackWidth = Math.min(TOOLTIP_WIDTH, window.innerWidth - 24);
  const box = ready
    ? layout.box
    : placeTooltip(null, cardHeight || 220, { width: window.innerWidth, height: window.innerHeight });

  const next = () => {
    if (isLast) {
      onClose();
      return;
    }
    go((value) => value + 1);
  };

  return createPortal(
    <div ref={rootRef} className="order-tutorial" role="presentation">
      {/* Bloqueia qualquer clique na página, inclusive dentro do destaque. */}
      <div className="order-tutorial__blocker" />

      {/* Um único recorte: a sombra enorme escurece o resto e o recorte desliza entre os passos. */}
      <div
        className={`order-tutorial__spot ${hole ? '' : 'order-tutorial__spot--none'}`}
        style={
          hole
            ? { top: hole.top, left: hole.left, width: hole.width, height: hole.height }
            : { top: '50%', left: '50%', width: 0, height: 0 }
        }
      />

      {/* Véu escuro e desfocado durante a preparação: esconde os painéis abrindo e fechando por trás. */}
      <div className={`order-tutorial__veil ${ready ? 'order-tutorial__veil--out' : ''}`} aria-hidden={ready}>
        <BanoffeeBuild key={prepareRun} />
        <p className="order-tutorial__pill" role="status">
          Preparando simulação
          <span className="order-tutorial__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>

      {/* Medidor invisível: todos os passos no mesmo cartão, para travar a altura pelo maior. */}
      <div ref={measureRef} className="order-tutorial__measure" aria-hidden="true">
        {steps.map((item, i) => (
          <div key={i} className="order-tutorial__card" style={{ width: fallbackWidth }}>
            <p className="order-tutorial__kicker">{title}</p>
            <h2>{item.title}</h2>
            <p className="order-tutorial__copy">{item.content}</p>
            <p className="order-tutorial__progress">{i + 1} de {steps.length}</p>
            <div className="order-tutorial__actions">
              <button type="button" className="order-tutorial__ghost" tabIndex={-1}>Pular tutorial</button>
              <div className="order-tutorial__nav">
                <button type="button" className="order-tutorial__ghost" tabIndex={-1}>Voltar</button>
                <button type="button" className="order-tutorial__next" tabIndex={-1}>Próximo</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`order-tutorial__card order-tutorial__card--live ${ready ? '' : 'order-tutorial__card--waiting'} ${ready && glide ? 'order-tutorial__card--glide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        style={{
          top: box.top,
          left: box.left,
          width: box.width,
          height: cardHeight || undefined,
        }}
      >
        <button
          type="button"
          className="order-tutorial__close"
          onClick={onClose}
          aria-label="Fechar tutorial"
        >
          ×
        </button>
        <p className="order-tutorial__kicker">{title}</p>

        <div key={ready ? index : 'waiting'} className="order-tutorial__slide">
          <h2 id={labelId}>{step.title}</h2>
          <p className="order-tutorial__copy">{step.content}</p>
          <p className="order-tutorial__progress" aria-live="polite">
            {index + 1} de {steps.length}
          </p>
        </div>

        <div className="order-tutorial__actions">
          <button type="button" className="order-tutorial__ghost" onClick={onClose}>
            Pular tutorial
          </button>
          <div className="order-tutorial__nav">
            <button
              type="button"
              className="order-tutorial__ghost"
              onClick={() => go((value) => Math.max(value - 1, 0))}
              disabled={!ready || isFirst}
            >
              Voltar
            </button>
            <button
              ref={nextRef}
              type="button"
              className="order-tutorial__next"
              onClick={next}
              disabled={!ready}
            >
              {isLast ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

OrderTutorial.propTypes = {
  open: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.shape({
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onEnter: PropTypes.func,
    scroll: PropTypes.bool,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};
