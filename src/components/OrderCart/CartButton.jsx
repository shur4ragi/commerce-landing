import PropTypes from 'prop-types';
import { useOrder } from '../../hooks/useOrder.js';
import { useSite } from '../../hooks/useSite.js';
import './CartButton.css';

export function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.4 7.2h12.3l-1.1 8.2a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.6L6 5.2H3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="19.2" r="1.15" fill="currentColor" />
      <circle cx="16.4" cy="19.2" r="1.15" fill="currentColor" />
    </svg>
  );
}

// Abre o carrinho (com o skeleton de abertura). `icon`: botão redondo só com ícone (header);
// `pill`: ícone + rótulo, para ficar ao lado das outras ações (ex.: barra do cardápio).
export default function CartButton({ variant = 'icon', className = '', ...props }) {
  const { content } = useSite();
  const { items, openCart } = useOrder();
  const label = content.order?.cartLabel || 'Seu pedido';
  const count = items.length;

  return (
    <button
      type="button"
      className={`cart-button cart-button--${variant} ${className}`.trim()}
      aria-label={count ? `${label}: ${count} ${count === 1 ? 'item' : 'itens'}` : label}
      onClick={() => openCart('summary', { boot: true })}
      {...props}
    >
      <CartIcon />
      {variant === 'pill' ? <span className="cart-button__label">{label}</span> : null}
      {count > 0 ? (
        <span key={count} className="cart-button__badge" aria-hidden="true">
          {count}
        </span>
      ) : null}
    </button>
  );
}

CartButton.propTypes = {
  variant: PropTypes.oneOf(['icon', 'pill']),
  className: PropTypes.string,
};
