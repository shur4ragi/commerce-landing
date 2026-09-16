import PropTypes from 'prop-types';
import { UseInputPadrao } from '../ui';
import './OrderCheckout.css';

export default function OrderCheckout({
  fields,
  customer,
  paymentMethods,
  onChange,
  onBack,
  backLabel,
  children,
}) {
  return (
    <form className="order-checkout" onSubmit={(event) => event.preventDefault()}>
      <div className="order-checkout__fields">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <label key={field.id} className="order-checkout__field" data-tour={field.tour}>
                <span>
                  {field.label}
                  {field.required ? ' *' : ''}
                </span>
                <select
                  value={customer[field.key] || ''}
                  required={field.required}
                  onChange={(event) => onChange({ [field.key]: event.target.value })}
                  aria-label={field.label}
                >
                  <option value="">Selecione</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </label>
            );
          }

          return (
            <div key={field.id} data-tour={field.tour}>
              <UseInputPadrao
                label={field.label}
                identifier={`order-${field.id}`}
                required={field.required}
                type={field.type || 'text'}
                value={customer[field.key] || ''}
                onChange={(event) => onChange({ [field.key]: event.target.value })}
                aria-label={field.label}
              />
            </div>
          );
        })}
      </div>

      <button type="button" className="order-checkout__back" onClick={onBack}>
        {backLabel}
      </button>
      {children}
    </form>
  );
}

OrderCheckout.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    tour: PropTypes.string,
  })).isRequired,
  customer: PropTypes.object.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  backLabel: PropTypes.string,
  children: PropTypes.node,
};
