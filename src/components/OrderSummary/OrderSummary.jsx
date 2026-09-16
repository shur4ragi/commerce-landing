import PropTypes from 'prop-types';
import { formatPrice, getLineTotal } from '../../utils/order.js';
import './OrderSummary.css';

function QuantityControl({ value, onChange, label }) {
  return (
    <div className="order-summary__qty" data-tour="cart-quantity">
      <button type="button" onClick={() => onChange(value - 1)} aria-label={`Diminuir ${label}`}>
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label={`Aumentar ${label}`}>
        +
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default function OrderSummary({
  items,
  total,
  emptyMessage,
  onQuantityChange,
  onRemove,
  onCheckout,
  checkoutLabel,
}) {
  if (!items.length) {
    return (
      <div className="order-summary" data-tour="cart-edit">
        <p className="order-summary__empty">{emptyMessage}</p>
        <button
          type="button"
          className="order-summary__checkout"
          data-tour="checkout"
          onClick={onCheckout}
        >
          {checkoutLabel}
        </button>
      </div>
    );
  }

  const subtotal = total;

  return (
    <div className="order-summary" data-tour="cart-edit">
      <ul className="order-summary__list">
        {items.map((item) => (
          <li key={item.id} className="order-summary__item">
            <div>
              <strong>{item.name}</strong>
              {item.options?.length ? (
                <p className="order-summary__options">
                  {item.options.map((option) => option.label).join(' · ')}
                </p>
              ) : null}
              {item.observation ? (
                <p className="order-summary__options">{item.observation}</p>
              ) : null}
              <p className="order-summary__unit">
                {formatPrice(item.price)} · un.
              </p>
            </div>
            <div className="order-summary__side">
              <QuantityControl
                value={item.quantity}
                label={item.name}
                onChange={(quantity) => onQuantityChange(item.id, quantity)}
              />
              <span className="order-summary__line">{formatPrice(getLineTotal(item))}</span>
              <button
                type="button"
                className="order-summary__remove"
                onClick={() => onRemove(item.id)}
                aria-label={`Remover ${item.name}`}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <dl className="order-summary__totals">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="order-summary__checkout"
        data-tour="checkout"
        onClick={onCheckout}
      >
        {checkoutLabel}
      </button>
    </div>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
    })),
    observation: PropTypes.string,
  })).isRequired,
  total: PropTypes.number.isRequired,
  emptyMessage: PropTypes.string,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  checkoutLabel: PropTypes.string,
};
