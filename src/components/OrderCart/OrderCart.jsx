import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOrder } from '../../hooks/useOrder.js';
import { useSite } from '../../hooks/useSite.js';
import OrderCheckout from '../OrderCheckout';
import OrderSummary from '../OrderSummary';
import WhatsAppOrder from '../WhatsAppOrder';
import './OrderCart.css';

function CartIcon() {
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

export default function OrderCart() {
  const titleId = useId();
  const closeRef = useRef(null);
  const { content, config } = useSite();
  const orderCopy = content.order || {};
  const fields = orderCopy.fields || [];
  const {
    items,
    total,
    customer,
    setItemQuantity,
    removeItem,
    updateCustomer,
    cartOpen,
    openCart,
    closeCart,
    view,
    setView,
  } = useOrder();

  useEffect(() => {
    if (!cartOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [cartOpen, closeCart]);

  const missing = fields
    .filter((field) => field.required)
    .filter((field) => !String(customer[field.key] || '').trim());
  const canSend = items.length > 0 && missing.length === 0;

  return (
    <>
      <button
        type="button"
        className="order-cart__fab"
        data-tour="cart"
        aria-label={orderCopy.cartLabel || 'Seu pedido'}
        onClick={() => openCart('summary')}
      >
        <CartIcon />
        {items.length > 0 ? <span className="order-cart__badge">{items.length}</span> : null}
      </button>

      {cartOpen && typeof document !== 'undefined'
        ? createPortal(
          <div className="order-cart__overlay" onClick={closeCart}>
            <aside
              className="order-cart__panel"
              data-tour="cart-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="order-cart__header">
                <h2 id={titleId}>{orderCopy.cartLabel || 'Seu pedido'}</h2>
                <button
                  ref={closeRef}
                  type="button"
                  className="order-cart__close"
                  onClick={closeCart}
                  aria-label="Fechar pedido"
                >
                  ×
                </button>
              </header>

              <div className="order-cart__body">
                {view === 'checkout' ? (
                  <OrderCheckout
                    fields={fields}
                    customer={customer}
                    paymentMethods={orderCopy.paymentMethods || []}
                    onChange={updateCustomer}
                    onBack={() => setView('summary')}
                    backLabel={orderCopy.backToCartLabel || 'Voltar ao pedido'}
                  >
                    <WhatsAppOrder
                      phone={config.business.whatsapp}
                      order={{ customer, items, total }}
                      label={orderCopy.sendLabel || 'Enviar pedido pelo WhatsApp'}
                      disabled={!canSend}
                      disabledReason={
                        items.length === 0
                          ? 'Adicione um produto ao pedido para enviar.'
                          : 'Preencha os campos obrigatórios para enviar.'
                      }
                    />
                  </OrderCheckout>
                ) : (
                  <OrderSummary
                    items={items}
                    total={total}
                    emptyMessage={orderCopy.emptyCart}
                    onQuantityChange={setItemQuantity}
                    onRemove={removeItem}
                    onCheckout={() => setView('checkout')}
                    checkoutLabel={orderCopy.checkoutLabel || 'Finalizar pedido'}
                  />
                )}
              </div>
            </aside>
          </div>,
          document.body,
        )
        : null}
    </>
  );
}
