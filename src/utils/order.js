export function parsePrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const raw = String(value ?? '').trim();
  if (!raw) return 0;

  const numeric = raw.replace(/[^\d,.-]/g, '');
  if (!numeric) return 0;

  if (numeric.includes(',')) {
    return Number(numeric.replace(/\./g, '').replace(',', '.')) || 0;
  }

  return Number(numeric) || 0;
}

export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) || 0);
}

export function getLineTotal(item) {
  return (Number(item?.price) || 0) * (Number(item?.quantity) || 0);
}

export function getOrderTotal(items = []) {
  return items.reduce((sum, item) => sum + getLineTotal(item), 0);
}

export function buildLineKey(productId, options = []) {
  const token = options
    .map((option) => `${option.groupId}:${option.id}`)
    .sort()
    .join('|');
  return `${productId}::${token}`;
}

function formatItemLine(item) {
  const extras = (item.options || []).map((option) => option.label).filter(Boolean);
  const name = extras.length ? `${item.name} (${extras.join(', ')})` : item.name;
  return `${item.quantity}x ${name} — ${formatPrice(getLineTotal(item))}`;
}

export function generateWhatsAppMessage(order = {}) {
  const customer = order.customer || {};
  const items = order.items || [];
  const total = order.total ?? getOrderTotal(items);
  const lines = ['Olá! Gostaria de fazer um pedido.', ''];

  if (customer.name) lines.push(`Cliente: ${customer.name}`);
  if (customer.phone) lines.push(`Telefone: ${customer.phone}`);

  const address = [customer.address, customer.number, customer.complement]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(', ');
  if (address) lines.push(`Endereço: ${address}`);
  if (customer.paymentMethod) lines.push(`Pagamento: ${customer.paymentMethod}`);

  lines.push('', 'Pedido:');

  if (items.length === 0) {
    lines.push('(nenhum item)');
  } else {
    items.forEach((item) => {
      lines.push(formatItemLine(item));
      if (item.observation) lines.push(`  Obs.: ${item.observation}`);
    });
  }

  if (customer.observation) {
    lines.push('', 'Observações:', customer.observation);
  }

  lines.push('', `Total: ${formatPrice(total)}`);
  return lines.join('\n');
}
