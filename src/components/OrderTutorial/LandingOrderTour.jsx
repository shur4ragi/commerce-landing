import { useMemo } from 'react';
import { useOrder } from '../../hooks/useOrder.js';
import { useSite } from '../../hooks/useSite.js';
import OrderTutorial from './OrderTutorial.jsx';

// Simulação em 4 passos: cardápio → item → carrinho → WhatsApp.
// Cada onEnter só monta a tela do passo (sem esperas); medir e posicionar fica com o
// OrderTutorial, que faz isso uma vez na abertura.
export default function LandingOrderTour() {
  const { content } = useSite();
  const products = content.products?.items || [];
  const {
    tutorialActive,
    stopTutorial,
    requestProduct,
    closeCart,
    openCart,
  } = useOrder();

  const optionsProduct = products.find((item) => item.options?.length) || products[0];

  const steps = useMemo(() => {
    const closePanel = () => requestProduct('');

    return [
      {
        target: '[data-tour="product"]',
        scroll: true,
        title: 'Escolha no cardápio',
        content: 'Toque em um produto do cardápio para ver foto, preço e as opções disponíveis.',
        onEnter: () => {
          closeCart();
          closePanel();
        },
      },
      {
        target: '[data-tour="product-panel"]',
        title: 'Monte do seu jeito',
        content: 'Defina a quantidade, escolha as opções e toque em adicionar ao carrinho.',
        onEnter: () => {
          closeCart();
          requestProduct(optionsProduct?.id || '');
        },
      },
      {
        target: '[data-tour="cart-panel"]',
        title: 'Confira o pedido',
        content: 'No carrinho você revisa itens, opções e total, e ainda pode aumentar, diminuir ou remover antes de finalizar.',
        onEnter: () => {
          closePanel();
          openCart('summary');
        },
      },
      {
        target: '[data-tour="cart-panel"]',
        title: 'Envie pelo WhatsApp',
        content: 'Preencha seus dados e a forma de pagamento. O pedido vira uma mensagem pronta: é só revisar e enviar no WhatsApp.',
        onEnter: () => {
          closePanel();
          openCart('checkout');
        },
      },
    ];
  }, [closeCart, openCart, optionsProduct, requestProduct]);

  return (
    <OrderTutorial
      open={tutorialActive}
      steps={steps}
      onClose={() => {
        closeCart();
        requestProduct('');
        stopTutorial();
      }}
      title="Como fazer um pedido?"
    />
  );
}
