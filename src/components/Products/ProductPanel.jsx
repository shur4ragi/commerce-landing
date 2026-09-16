import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from '../ui';
import { buildLineKey, formatPrice, parsePrice } from '../../utils/order.js';
import styles from './styles.module.css';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

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

function defaultSelections(groups = []) {
  const selected = {};
  groups.forEach((group) => {
    if (group.type === 'multi') selected[group.id] = [];
    else selected[group.id] = group.required ? group.choices?.[0]?.id || '' : '';
  });
  return selected;
}

function resolveOptions(groups = [], selected = {}) {
  const result = [];
  groups.forEach((group) => {
    const value = selected[group.id];
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    ids.forEach((id) => {
      const choice = (group.choices || []).find((entry) => entry.id === id);
      if (!choice) return;
      result.push({
        groupId: group.id,
        id: choice.id,
        label: `${group.label}: ${choice.label}`,
        price: Number(choice.price) || 0,
      });
    });
  });
  return result;
}

export default function ProductPanel({
  item,
  open,
  onClose,
  saved,
  onToggleSave,
  onAddToCart,
  saveLabel,
  savedLabel,
  addToCartLabel,
  quantityLabel,
  itemObservationLabel,
}) {
  const titleId = useId();
  const closeRef = useRef(null);
  const groups = useMemo(() => item?.options || [], [item?.options]);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(() => defaultSelections(groups));
  const [observation, setObservation] = useState('');

  useEffect(() => {
    setQuantity(1);
    setSelected(defaultSelections(item?.options || []));
    setObservation('');
  }, [item]);

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

  const chosen = useMemo(() => resolveOptions(groups, selected), [groups, selected]);
  const unitPrice = parsePrice(item?.price) + chosen.reduce((sum, option) => sum + option.price, 0);

  const toggleMulti = (groupId, choiceId) => {
    setSelected((current) => {
      const list = current[groupId] || [];
      const next = list.includes(choiceId)
        ? list.filter((id) => id !== choiceId)
        : [...list, choiceId];
      return { ...current, [groupId]: next };
    });
  };

  const handleAdd = () => {
    if (!item) return;
    onAddToCart({
      id: buildLineKey(item.id, chosen),
      productId: item.id,
      name: item.title,
      quantity,
      price: unitPrice,
      options: chosen,
      observation,
    });
    onClose();
  };

  if (!open || !item || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.panelClose} onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </button>

        {item.image ? (
          <figure className={styles.panelMedia}>
            <img src={item.image} alt="" />
          </figure>
        ) : null}

        <div className={styles.panelBody}>
          {item.category ? <p className={styles.panelCategory}>{item.category}</p> : null}
          <h2 id={titleId}>{item.title}</h2>
          <p className={styles.panelPrice}>{formatPrice(unitPrice)}</p>
          {item.description ? <p className={styles.panelText}>{item.description}</p> : null}
          {item.details ? <p className={styles.panelDetails}>{item.details}</p> : null}

          <div className={styles.qtyRow} data-tour="quantity">
            <span>{quantityLabel || 'Quantidade'}</span>
            <div className={styles.qtyControl}>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>

          {groups.length > 0 ? (
            <div className={styles.options} data-tour="options">
              {groups.map((group) => (
                <fieldset key={group.id} className={styles.optionGroup}>
                  <legend>{group.label}{group.required ? ' *' : ''}</legend>
                  <div className={styles.optionList}>
                    {(group.choices || []).map((choice) => {
                      const extra = Number(choice.price) || 0;
                      const checked = group.type === 'multi'
                        ? (selected[group.id] || []).includes(choice.id)
                        : selected[group.id] === choice.id;
                      return (
                        <label key={choice.id} className={`${styles.optionChip} ${checked ? styles.optionChipActive : ''}`}>
                          <input
                            type={group.type === 'multi' ? 'checkbox' : 'radio'}
                            name={group.id}
                            checked={checked}
                            onChange={() => {
                              if (group.type === 'multi') toggleMulti(group.id, choice.id);
                              else setSelected((current) => ({ ...current, [group.id]: choice.id }));
                            }}
                          />
                          <span>
                            {choice.label}
                            {extra > 0 ? ` · + ${formatPrice(extra)}` : ''}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          ) : null}

          <label className={styles.noteField}>
            <span>{itemObservationLabel || 'Observação do item'}</span>
            <textarea
              rows={2}
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Ex.: sem açúcar"
            />
          </label>

          <div className={styles.panelActions}>
            <button
              type="button"
              className={`${styles.saveButton} ${saved ? styles.saveButtonActive : ''}`}
              onClick={() => onToggleSave(item.id)}
              aria-pressed={saved}
            >
              <BookmarkIcon filled={saved} />
              {saved ? savedLabel : saveLabel}
            </button>
            <Button
              type="button"
              variant="whatsapp"
              className={styles.orderButton}
              data-tour="add-cart"
              onClick={handleAdd}
            >
              {addToCartLabel || 'Adicionar ao carrinho'}
            </Button>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

ProductPanel.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    options: PropTypes.array,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  saved: PropTypes.bool,
  onToggleSave: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  saveLabel: PropTypes.string,
  savedLabel: PropTypes.string,
  addToCartLabel: PropTypes.string,
  quantityLabel: PropTypes.string,
  itemObservationLabel: PropTypes.string,
};
