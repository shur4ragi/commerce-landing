import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOrder } from '../../hooks/useOrder.js';
import { useSavedItems } from '../../hooks/useSavedItems.js';
import { useSite } from '../../hooks/useSite.js';
import { Card, Reveal, Section } from '../ui';
import CatalogModal from './CatalogModal.jsx';
import ProductPanel from './ProductPanel.jsx';
import styles from './styles.module.css';

function BookmarkIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.4L6 20V5.5a1 1 0 0 1 1-1Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function groupItems(items) {
  const groups = [];
  const index = new Map();

  items.forEach((item) => {
    const category = item.category || 'Outros';
    if (!index.has(category)) {
      const group = { category, items: [] };
      index.set(category, group);
      groups.push(group);
    }
    index.get(category).items.push(item);
  });

  return groups;
}

export default function Products() {
  const { clientId, content } = useSite();
  const products = content.products;
  const orderCopy = content.order || {};
  const items = useMemo(() => products.items || [], [products.items]);
  const { ids, has, toggle, count } = useSavedItems(clientId);
  const {
    addItem,
    tutorialActive,
    startTutorial,
    requestedProductId,
    consumeProductRequest,
  } = useOrder();
  const scrollerRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [catalogMode, setCatalogMode] = useState(null);

  const selected = items.find((item) => item.id === selectedId) || null;
  const savedItems = useMemo(
    () => ids.map((id) => items.find((item) => item.id === id)).filter(Boolean),
    [ids, items],
  );

  const catalogGroups = useMemo(() => {
    if (catalogMode === 'saved') return groupItems(savedItems);
    return groupItems(items);
  }, [catalogMode, items, savedItems]);

  useEffect(() => {
    if (requestedProductId === null) return;
    if (requestedProductId === '') setSelectedId(null);
    else {
      setCatalogMode(null);
      setSelectedId(requestedProductId);
    }
    consumeProductRequest();
  }, [requestedProductId, consumeProductRequest]);

  const scrollBy = (direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 360), behavior: 'smooth' });
  };

  const openItem = useCallback((item) => {
    setCatalogMode(null);
    setSelectedId(item.id);
  }, []);

  const closePanel = useCallback(() => setSelectedId(null), []);
  const closeCatalog = useCallback(() => setCatalogMode(null), []);

  return (
    <Section
      id={products.id}
      eyebrow={products.eyebrow}
      title={products.title}
      description={products.description}
      tone="accent"
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarActions}>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => setCatalogMode('saved')}
          >
            <BookmarkIcon filled={count > 0} />
            {products.savedLabel || 'Salvos'}
            {count > 0 ? <span className={styles.count}>{count}</span> : null}
          </button>
          <button type="button" className={styles.toolbarButton} onClick={() => setCatalogMode('all')}>
            {products.viewAllLabel || 'Ver todos'}
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={startTutorial}
            aria-label={orderCopy.simulateLabel || 'Simular pedido'}
          >
            {orderCopy.simulateLabel || 'Simular pedido'}
          </button>
        </div>
        <div className={styles.carouselNav}>
          <button type="button" className={styles.navButton} onClick={() => scrollBy(-1)} aria-label="Itens anteriores">
            ‹
          </button>
          <button type="button" className={styles.navButton} onClick={() => scrollBy(1)} aria-label="Próximos itens">
            ›
          </button>
        </div>
      </div>

      <Reveal>
        <div
          ref={scrollerRef}
          className={styles.carousel}
          tabIndex={0}
          aria-label="Cardápio em destaque"
        >
          {items.map((item, index) => {
            const saved = has(item.id);
            return (
              <div key={item.id} className={styles.slide} data-tour={index === 0 ? 'product' : undefined}>
                <div className={`${styles.cardWrap} ${selectedId === item.id ? styles.cardActive : ''}`}>
                  <Card
                    image={item.image}
                    imageAlt=""
                    title={item.title}
                    description={item.description}
                    meta={item.price}
                  />
                  <button
                    type="button"
                    className={styles.openHit}
                    onClick={() => {
                      if (tutorialActive) openItem(item);
                    }}
                    onDoubleClick={() => openItem(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openItem(item);
                      }
                    }}
                    aria-label={`Ver ${item.title}. Clique duas vezes para abrir.`}
                    title="Clique duas vezes para abrir"
                  />
                  <button
                    type="button"
                    className={`${styles.saveOnCard} ${saved ? styles.saveOnCardActive : ''}`}
                    onClick={() => toggle(item.id)}
                    aria-label={saved ? `Remover ${item.title} dos salvos` : `Salvar ${item.title}`}
                    aria-pressed={saved}
                  >
                    <BookmarkIcon filled={saved} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <ProductPanel
        item={selected}
        open={Boolean(selected)}
        onClose={closePanel}
        saved={selected ? has(selected.id) : false}
        onToggleSave={toggle}
        onAddToCart={addItem}
        saveLabel={products.saveLabel || 'Salvar'}
        savedLabel={products.savedItemLabel || 'Salvo'}
        addToCartLabel={orderCopy.addToCartLabel}
        quantityLabel={orderCopy.quantityLabel}
        itemObservationLabel={orderCopy.itemObservationLabel}
      />

      <CatalogModal
        open={Boolean(catalogMode)}
        onClose={closeCatalog}
        title={catalogMode === 'saved' ? (products.savedLabel || 'Salvos') : (products.eyebrow || 'Cardápio')}
        groups={catalogGroups}
        emptyMessage={products.emptySaved}
        onSelect={openItem}
      />
    </Section>
  );
}
