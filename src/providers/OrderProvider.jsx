import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { buildLineKey, getOrderTotal } from '../utils/order.js';
import { OrderContext } from './OrderContext.js';

const EMPTY_CUSTOMER = {
  name: '',
  phone: '',
  address: '',
  number: '',
  complement: '',
  paymentMethod: '',
  observation: '',
};

export default function OrderProvider({ children }) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [cartOpen, setCartOpen] = useState(false);
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

  const openCart = useCallback((nextView = 'summary') => {
    setView(nextView);
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
    setView('summary');
  }, []);

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
  }), [
    items,
    total,
    customer,
    addItem,
    setItemQuantity,
    removeItem,
    updateCustomer,
    cartOpen,
    openCart,
    closeCart,
    view,
    tutorialActive,
    startTutorial,
    stopTutorial,
    requestedProductId,
    requestProduct,
    consumeProductRequest,
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
