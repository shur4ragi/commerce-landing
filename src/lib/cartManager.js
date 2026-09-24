/**
 * Cart Manager - gerencia o carrinho de compras e métodos de pagamento
 */

export const PAYMENT_METHODS = {
  WHATSAPP: 'whatsapp',
  PIX: 'pix',
  TRANSFER: 'transfer',
  STRIPE: 'stripe',
  PAGSEGURO: 'pagseguro',
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.WHATSAPP]: 'WhatsApp',
  [PAYMENT_METHODS.PIX]: 'PIX',
  [PAYMENT_METHODS.TRANSFER]: 'Transferência Bancária',
  [PAYMENT_METHODS.STRIPE]: 'Cartão de Crédito',
  [PAYMENT_METHODS.PAGSEGURO]: 'PagSeguro',
};

/**
 * Cria uma mensagem WhatsApp formatada com os itens do carrinho
 * @param {Array} items itens do carrinho
 * @param {Object} customer dados do cliente
 * @returns {string} mensagem formatada
 */
export function formatWhatsappMessage(items, customer = {}) {
  let message = '*Novo Pedido*\n\n';

  message += '*Itens do Pedido:*\n';
  items.forEach((item) => {
    const price = item.price ? ` - R$ ${(item.price).toFixed(2)}` : '';
    const quantity = item.quantity ? ` (x${item.quantity})` : '';
    message += `• ${item.name}${quantity}${price}\n`;
  });

  message += '\n*Total: R$ ' + calculateTotal(items).toFixed(2) + '*\n';

  if (customer.name) {
    message += `\n*Cliente:* ${customer.name}`;
  }
  if (customer.phone) {
    message += `\n*Telefone:* ${customer.phone}`;
  }
  if (customer.address) {
    message += `\n*Endereço:* ${customer.address}`;
  }
  if (customer.observation) {
    message += `\n*Observações:* ${customer.observation}`;
  }

  return message;
}

/**
 * Calcula o total do carrinho
 * @param {Array} items itens do carrinho
 * @returns {number} total em reais
 */
export function calculateTotal(items) {
  return items.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
    return total + (price * quantity);
  }, 0);
}

/**
 * Cria URL de pagamento PIX (para futuro)
 * @param {string} pixKey chave PIX
 * @param {number} total valor total
 * @param {string} description descrição
 * @returns {string} string de identificação PIX
 */
export function createPixPaymentData(pixKey, total, description = '') {
  return {
    type: PAYMENT_METHODS.PIX,
    pixKey,
    total,
    description,
  };
}

/**
 * Cria dados para pagamento por transferência
 * @param {Object} bankData dados bancários
 * @returns {Object} dados de pagamento
 */
export function createTransferPaymentData(bankData) {
  return {
    type: PAYMENT_METHODS.TRANSFER,
    bank: bankData.bank || '',
    accountType: bankData.accountType || 'corrente',
    agency: bankData.agency || '',
    account: bankData.account || '',
    holder: bankData.holder || '',
  };
}

/**
 * Valida itens do carrinho
 * @param {Array} items itens do carrinho
 * @returns {Object} resultado da validação
 */
export function validateCart(items) {
  const errors = [];

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Carrinho vazio');
    return { valid: false, errors };
  }

  items.forEach((item, index) => {
    if (!item.name || typeof item.name !== 'string') {
      errors.push(`Item ${index + 1}: nome inválido`);
    }
    if (typeof item.price !== 'number' || item.price < 0) {
      errors.push(`Item ${index + 1}: preço inválido`);
    }
    if (typeof item.quantity !== 'number' || item.quantity < 1) {
      errors.push(`Item ${index + 1}: quantidade inválida`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formata valor em reais
 * @param {number} value valor
 * @returns {string} valor formatado
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Cria um resumo do pedido
 * @param {Array} items itens
 * @param {Object} customer dados do cliente
 * @param {string} paymentMethod método de pagamento
 * @returns {Object} resumo do pedido
 */
export function createOrderSummary(items, customer = {}, paymentMethod = PAYMENT_METHODS.WHATSAPP) {
  const total = calculateTotal(items);

  return {
    items,
    customer,
    paymentMethod,
    total,
    subtotal: total, // pode incluir descontos depois
    itemCount: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Exporta pedido em formato JSON
 * @param {Object} order pedido
 * @returns {string} JSON string
 */
export function exportOrderToJSON(order) {
  return JSON.stringify(order, null, 2);
}

/**
 * Salva pedido no localStorage (para draft/histórico local)
 * @param {Object} order pedido
 * @param {string} key chave de storage
 */
export function saveOrderToStorage(order, key = 'lastOrder') {
  try {
    localStorage.setItem(key, JSON.stringify(order));
  } catch (error) {
    console.error('[CartManager] Erro ao salvar pedido:', error);
  }
}

/**
 * Recupera pedido do localStorage
 * @param {string} key chave de storage
 * @returns {Object|null} pedido ou null
 */
export function getOrderFromStorage(key = 'lastOrder') {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('[CartManager] Erro ao recuperar pedido:', error);
    return null;
  }
}
