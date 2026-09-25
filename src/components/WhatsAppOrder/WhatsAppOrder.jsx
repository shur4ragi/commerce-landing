import PropTypes from 'prop-types';
import { usePendingAction } from '../../hooks/usePendingAction.js';
import { ActionSkeleton, Button } from '../ui';
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
  const outbound = usePendingAction();

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
    <>
      <Button
        type="button"
        variant="whatsapp"
        className="whatsapp-order"
        data-tour="whatsapp"
        aria-label={label}
        onClick={() => outbound.run('Abrindo o WhatsApp', () => {
          window.open(href, '_blank', 'noopener,noreferrer');
        })}
      >
        {label}
      </Button>
      {outbound.pending ? <ActionSkeleton variant="whatsapp" scope="screen" label={outbound.label} /> : null}
    </>
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
