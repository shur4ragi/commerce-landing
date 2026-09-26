import { useContext, useCallback, useMemo } from 'react';
import { OrderContext } from '../providers/OrderContext.js';
import {
  calculateTotal,
  formatCurrency,
  createOrderSummary,
  PAYMENT_METHODS,
} from '../lib/cartManager.js';

/**
 * Hook para gerenciar carrinho de compras
 * Fornece interface simples para adicionar/remover itens e gerenciar pagamento
 * @returns {Object} métodos e estado do carrinho
 */
export function useCart() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useCart deve ser usado dentro de OrderProvider');
  }

  const {
    items,
    total,
    customer,
    addItem,
    setItemQuantity,
    removeItem,
    updateCustomer,
    openCart,
    closeCart,
    cartOpen,
    view,
    setView,
  } = context;

  // Memoized calculations
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [items],
  );

  const formattedTotal = useMemo(() => formatCurrency(total), [total]);

  const cartEmpty = useMemo(() => items.length === 0, [items]);

  // Handlers
  const addToCart = useCallback((product, quantity = 1, options = {}) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      productId: product.id,
      ...options,
    };

    addItem(item);
  }, [addItem]);

  const updateQuantity = useCallback((itemId, quantity) => {
    setItemQuantity(itemId, quantity);
  }, [setItemQuantity]);

  const removeFromCart = useCallback((itemId) => {
    removeItem(itemId);
  }, [removeItem]);

  const updateCustomerInfo = useCallback((customerData) => {
    updateCustomer(customerData);
  }, [updateCustomer]);

  const selectPaymentMethod = useCallback((method) => {
    updateCustomer({ paymentMethod: method });
  }, [updateCustomer]);

  const openCheckout = useCallback((startView = 'summary') => {
    openCart(startView);
  }, [openCart]);

  const closeCheckout = useCallback(() => {
    closeCart();
  }, [closeCart]);

  const getCurrentOrder = useCallback(() => {
    return createOrderSummary(items, customer, customer.paymentMethod);
  }, [items, customer]);

  const clearCart = useCallback(() => {
    // Remove all items by setting quantity to 0
    items.forEach((item) => {
      removeItem(item.id);
    });
  }, [items, removeItem]);

  return {
    // State
    items,
    total,
    formattedTotal,
    itemCount,
    cartEmpty,
    customer,
    cartOpen,
    view,
    currentPaymentMethod: customer.paymentMethod || PAYMENT_METHODS.WHATSAPP,

    // Cart operations
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,

    // Customer operations
    updateCustomerInfo,
    selectPaymentMethod,

    // UI operations
    openCheckout,
    closeCheckout,
    setView,

    // Utilities
    getCurrentOrder,
  };
}

export default useCart;
