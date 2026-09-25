import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ActionSkeleton, Card } from '../ui';
import styles from './styles.module.css';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CafeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5.5 9.2h10.2v5.4a4.2 4.2 0 0 1-4.2 4.2H9.7a4.2 4.2 0 0 1-4.2-4.2V9.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M15.7 10.4h1.6a2.4 2.4 0 0 1 0 4.8h-1.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 5.8c.4.7.4 1.4 0 2.1M11.2 5.8c.4.7.4 1.4 0 2.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 5.5h10L14.2 12v6.2L9.8 20.2V12Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.4 8.2h5.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BrunchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.2 16.8h13.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 16.8c0-4.2 2.2-7.6 5-7.6s5 3.4 5 7.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 5.4v2.4M9.6 6.2 10.6 8M14.4 6.2 13.4 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PastryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.2 15.6c1.8-4.6 4.4-7.4 8.8-9.4 1.6 3.8.8 7.4-1.4 10.6-2.4 1.4-5.2 1-7.4-1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9.2 14.2c1.2-2.2 2.8-3.6 5.2-4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BeansIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.2 7.2c-2.6 2.6-2.4 7.4.6 9.4 2.8 1.8 6.4.2 8-2.6 1.8-3 .2-7-3.2-8.2-2-.8-4.2.2-5.4 1.4Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 8.6c1.8 1.6 4.2 4.8 5.8 8.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DefaultCategoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 7h4v4H7V7Zm6 0h4v4h-4V7ZM7 13h4v4H7v-4Zm6 0h4v4h-4v-4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  café: CafeIcon,
  cafe: CafeIcon,
  filtrados: FilterIcon,
  brunch: BrunchIcon,
  confeitaria: PastryIcon,
  grãos: BeansIcon,
  graos: BeansIcon,
};

function CategoryIcon({ category }) {
  const key = (category || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const Icon = CATEGORY_ICONS[key] || DefaultCategoryIcon;
  return <Icon />;
}

CategoryIcon.propTypes = {
  category: PropTypes.string,
};

export default function CatalogModal({
  open,
  onClose,
  title,
  groups,
  emptyMessage,
  onSelect,
}) {
  const titleId = useId();
  const closeRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) {
      setReady(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const hasItems = groups.some((group) => group.items.length > 0);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.catalog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.catalogHeader}>
          <h2 id={titleId}>{title}</h2>
          <button ref={closeRef} type="button" className={styles.panelClose} onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </button>
        </header>

        <div className={`${styles.catalogBody} ${!ready ? styles.catalogBodyLoading : ''}`}>
          {!ready ? (
            <ActionSkeleton variant="catalog" label="Abrindo o cardápio" />
          ) : !hasItems ? (
            <p className={styles.empty}>{emptyMessage}</p>
          ) : (
            groups.map((group) => (
              <section key={group.category} className={styles.catalogGroup}>
                <header className={styles.catalogDivider}>
                  <span className={styles.catalogDividerIcon}>
                    <CategoryIcon category={group.category} />
                  </span>
                  <div className={styles.catalogDividerCopy}>
                    <h3>{group.category}</h3>
                    <span className={styles.catalogDividerCount}>
                      {group.items.length} {group.items.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  <span className={styles.catalogDividerLine} aria-hidden="true" />
                </header>
                <div className={styles.catalogGrid}>
                  {group.items.map((item) => (
                    <div key={item.id} className={styles.cardWrap}>
                      <Card
                        className={styles.catalogCard}
                        image={item.image}
                        imageAlt=""
                        title={item.title}
                        description={item.description}
                        meta={item.price}
                      />
                      <button
                        type="button"
                        className={styles.openHit}
                        onDoubleClick={() => onSelect(item)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onSelect(item);
                          }
                        }}
                        aria-label={`Ver ${item.title}. Clique duas vezes para abrir.`}
                        title="Clique duas vezes para abrir"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

CatalogModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      items: PropTypes.array,
    }),
  ).isRequired,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
