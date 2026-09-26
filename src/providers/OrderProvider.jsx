import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { buildLineKey, getOrderTotal } from '../utils/order.js';
import { PAYMENT_METHODS } from '../lib/cartManager.js';
import { OrderContext } from './OrderContext.js';

const EMPTY_CUSTOMER = {
  name: '',
  phone: '',
  address: '',
  number: '',
  complement: '',
  paymentMethod: PAYMENT_METHODS.WHATSAPP,
  observation: '',
  // PIX payment fields
  pixKey: '',
  // Bank transfer fields
  bankData: {
    bank: '',
    accountType: 'corrente',
    agency: '',
    account: '',
    holder: '',
  },
};

const CART_BOOT_MS = 2000;

export default function OrderProvider({ children }) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBooting, setCartBooting] = useState(false);
  const bootTimer = useRef(0);
  const [view, setView] = useState('summary');
  const [tutorialActive, setTutorialActive] = useState(false);
  const [requestedProductId, setRequestedProductId] = useState(null);

  const addItem = useCallback((incoming) => {
    setItems((current) => {
      const id = incoming.id || buildLineKey(incoming.productId, incoming.options);
      const index = current.findIndex((item) => item.id === id);
      if (index === -1) {
        return [...current, { ...incoming, id, quantity: incoming.quantity || 1 }];
      }

      const next = [...current];
      next[index] = {
        ...next[index],
        quantity: next[index].quantity + (incoming.quantity || 1),
        observation: incoming.observation || next[index].observation,
      };
      return next;
    });
  }, []);

  const setItemQuantity = useCallback((id, quantity) => {
    setItems((current) => {
      if (quantity < 1) return current.filter((item) => item.id !== id);
      return current.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateCustomer = useCallback((patch) => {
    setCustomer((current) => ({ ...current, ...patch }));
  }, []);

  // `boot`: abre mostrando o skeleton "Abrindo pedido" antes do conteúdo (aberturas pelo usuário).
  const openCart = useCallback((nextView = 'summary', { boot = false } = {}) => {
    setView(nextView);
    setCartOpen(true);
    window.clearTimeout(bootTimer.current);
    setCartBooting(boot);
    if (boot) bootTimer.current = window.setTimeout(() => setCartBooting(false), CART_BOOT_MS);
  }, []);

  const closeCart = useCallback(() => {
    window.clearTimeout(bootTimer.current);
    setCartBooting(false);
    setCartOpen(false);
    setView('summary');
  }, []);

  useEffect(() => () => window.clearTimeout(bootTimer.current), []);

  const startTutorial = useCallback(() => {
    setTutorialActive(true);
  }, []);

  const stopTutorial = useCallback(() => {
    setTutorialActive(false);
  }, []);

  const requestProduct = useCallback((id) => {
    setRequestedProductId(id);
  }, []);

  const consumeProductRequest = useCallback(() => {
    setRequestedProductId(null);
  }, []);

  const setPaymentMethod = useCallback((method) => {
    updateCustomer({ paymentMethod: method });
  }, [updateCustomer]);

  const setPixKey = useCallback((pixKey) => {
    updateCustomer({ pixKey });
  }, [updateCustomer]);

  const setBankData = useCallback((bankData) => {
    updateCustomer({ bankData });
  }, [updateCustomer]);

  const total = useMemo(() => getOrderTotal(items), [items]);

  const value = useMemo(() => ({
    items,
    total,
    customer,
    addItem,
    setItemQuantity,
    removeItem,
    updateCustomer,
    cartOpen,
    cartBooting,
    setCartOpen,
    openCart,
    closeCart,
    view,
    setView,
    tutorialActive,
    startTutorial,
    stopTutorial,
    requestedProductId,
    requestProduct,
    consumeProductRequest,
    // Payment methods support
    setPaymentMethod,
    setPixKey,
    setBankData,
    availablePaymentMethods: Object.values(PAYMENT_METHODS),
  }), [
    items,
    total,
    customer,
    addItem,
    setItemQuantity,
    removeItem,
    updateCustomer,
    cartOpen,
    cartBooting,
    openCart,
    closeCart,
    view,
    tutorialActive,
    startTutorial,
    stopTutorial,
    requestedProductId,
    requestProduct,
    consumeProductRequest,
    setPaymentMethod,
    setPixKey,
    setBankData,
  ]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
