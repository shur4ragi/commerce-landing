import PropTypes from 'prop-types';
import { UseInputMask, UseInputPadrao } from '../ui';
import './OrderCheckout.css';

function CheckoutField({ field, value, onChange, paymentMethods }) {
  const [maskedValue, handleMasked, inputRef] = UseInputMask(
    field.mask || null,
    field.maskType || 'text',
    value || '',
    (event) => onChange({ [field.key]: event.target.value }),
  );

  return (
    <div data-tour={field.tour}>
      <UseInputPadrao
        label={field.label}
        identifier={`order-${field.id}`}
        required={field.required}
        type={field.type || 'text'}
        value={maskedValue}
        onChange={handleMasked}
        inputRef={inputRef}
        placeholder={field.placeholder}
        options={
          field.type === 'select'
            ? paymentMethods.map((method) => ({ value: method, label: method }))
            : undefined
        }
      />
    </div>
  );
}

CheckoutField.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
};

export default function OrderCheckout({
  fields,
  customer,
  paymentMethods = [],
  onChange,
  onBack,
  backLabel,
  children,
}) {
  return (
    <form className="order-checkout" onSubmit={(event) => event.preventDefault()}>
      <div className="order-checkout__fields">
        {fields.map((field) => (
          <CheckoutField
            key={field.id}
            field={field}
            value={customer[field.key] || ''}
            onChange={onChange}
            paymentMethods={paymentMethods}
          />
        ))}
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
    mask: PropTypes.string,
    maskType: PropTypes.string,
    placeholder: PropTypes.string,
  })).isRequired,
  customer: PropTypes.object.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  backLabel: PropTypes.string,
  children: PropTypes.node,
};
