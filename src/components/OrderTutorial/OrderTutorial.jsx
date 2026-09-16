import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './OrderTutorial.css';

const TOOLTIP_WIDTH = 340;
const GAP = 14;
const PAD = 8;

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

function measure(node) {
  if (!node) return null;
  const rect = node.getBoundingClientRect();
  if (rect.width < 2 && rect.height < 2) return null;
  return {
    top: Math.max(8, rect.top - PAD),
    left: Math.max(8, rect.left - PAD),
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };
}

function placeTooltip(hole, tooltipSize, viewport) {
  const width = Math.min(TOOLTIP_WIDTH, viewport.width - 24);
  const height = tooltipSize.height || 220;
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
    if (below + height <= viewport.height - 12) top = below;
    else if (above >= 12) top = above;
    else top = Math.max(12, viewport.height - height - 16);
  }

  left = Math.min(Math.max(12, left), viewport.width - width - 12);
  top = Math.min(Math.max(12, top), viewport.height - height - 12);

  return { top, left, width };
}

export default function OrderTutorial({
  open,
  steps,
  onClose,
  title = 'Como fazer um pedido?',
}) {
  const labelId = useId();
  const tooltipRef = useRef(null);
  const closeRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [hole, setHole] = useState(null);
  const [tooltipBox, setTooltipBox] = useState({ top: 24, left: 12, width: TOOLTIP_WIDTH });

  const step = steps[index] || null;
  const isLast = index >= steps.length - 1;
  const isFirst = index <= 0;

  const layout = useCallback(() => {
    const node = document.querySelector(step?.target || '');
    const nextHole = measure(node);
    setHole(nextHole);
    const size = tooltipRef.current?.getBoundingClientRect();
    setTooltipBox(placeTooltip(nextHole, size || { height: 220 }, {
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }, [step]);

  useEffect(() => {
    if (!open) {
      setIndex(0);
      setHole(null);
      return undefined;
    }

    let cancelled = false;
    const previousOverflow = document.body.style.overflow;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    (async () => {
      await step?.onEnter?.();
      if (cancelled) return;
      document.body.style.overflow = 'hidden';
      const node = await waitForTarget(step.target);
      if (cancelled) return;
      node?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      window.requestAnimationFrame(() => {
        if (!cancelled) layout();
      });
    })();

    const onReposition = () => layout();
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, index, step, layout]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      const tag = event.target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (typing) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, steps.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [open, onClose, steps.length]);

  if (!open || !step || typeof document === 'undefined') return null;

  const next = () => {
    if (isLast) {
      onClose();
      return;
    }
    setIndex((value) => value + 1);
  };

  return createPortal(
    <div className="order-tutorial" role="presentation">
      {hole ? (
        <>
          <div className="order-tutorial__shade" style={{ top: 0, left: 0, right: 0, height: hole.top }} />
          <div
            className="order-tutorial__shade"
            style={{ top: hole.top + hole.height, left: 0, right: 0, bottom: 0 }}
          />
          <div
            className="order-tutorial__shade"
            style={{ top: hole.top, left: 0, width: hole.left, height: hole.height }}
          />
          <div
            className="order-tutorial__shade"
            style={{
              top: hole.top,
              left: hole.left + hole.width,
              right: 0,
              height: hole.height,
            }}
          />
          <div
            className="order-tutorial__spot"
            style={{
              top: hole.top,
              left: hole.left,
              width: hole.width,
              height: hole.height,
            }}
          />
        </>
      ) : (
        <div className="order-tutorial__shade order-tutorial__shade--full" />
      )}

      <div
        ref={tooltipRef}
        className="order-tutorial__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        style={{ top: tooltipBox.top, left: tooltipBox.left, width: tooltipBox.width }}
      >
        <button
          ref={closeRef}
          type="button"
          className="order-tutorial__close"
          onClick={onClose}
          aria-label="Fechar tutorial"
        >
          ×
        </button>
        <p className="order-tutorial__kicker">{title}</p>
        <h2 id={labelId}>{step.title}</h2>
        <p className="order-tutorial__copy">{step.content}</p>
        <p className="order-tutorial__progress" aria-live="polite">
          {index + 1} de {steps.length}
        </p>
        <div className="order-tutorial__actions">
          <button type="button" className="order-tutorial__ghost" onClick={onClose}>
            Pular tutorial
          </button>
          <div className="order-tutorial__nav">
            <button
              type="button"
              className="order-tutorial__ghost"
              onClick={() => setIndex((value) => Math.max(value - 1, 0))}
              disabled={isFirst}
            >
              Voltar
            </button>
            <button type="button" className="order-tutorial__next" onClick={next}>
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
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};
