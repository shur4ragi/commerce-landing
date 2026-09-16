import PropTypes from 'prop-types';
import { Button } from '../ui';
import { buildWhatsappUrl } from '../../utils/whatsapp.js';
import { generateWhatsAppMessage, getOrderTotal } from '../../utils/order.js';
import './WhatsAppOrder.css';

export default function WhatsAppOrder({
  phone,
  order,
  label,
  disabled,
  disabledReason,
}) {
  const message = generateWhatsAppMessage({
    ...order,
    total: order.total ?? getOrderTotal(order.items || []),
  });
  const href = buildWhatsappUrl(phone, message);

  if (disabled) {
    return (
      <button
        type="button"
        className="whatsapp-order whatsapp-order--disabled"
        data-tour="whatsapp"
        aria-label={label}
        title={disabledReason}
        disabled
      >
        {label}
      </button>
    );
  }

  return (
    <Button
      href={href}
      target="_blank"
      variant="whatsapp"
      className="whatsapp-order"
      data-tour="whatsapp"
      aria-label={label}
    >
      {label}
    </Button>
  );
}

WhatsAppOrder.propTypes = {
  phone: PropTypes.string,
  order: PropTypes.shape({
    customer: PropTypes.object,
    items: PropTypes.array,
    total: PropTypes.number,
  }).isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  disabledReason: PropTypes.string,
};
