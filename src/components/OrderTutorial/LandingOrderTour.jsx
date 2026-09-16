import { useMemo } from 'react';
import { useOrder } from '../../hooks/useOrder.js';
import { useSite } from '../../hooks/useSite.js';
import OrderTutorial from './OrderTutorial.jsx';

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

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

  const firstId = products[0]?.id || '';
  const optionsProduct = products.find((item) => item.options?.length) || products[0];

  const steps = useMemo(() => {
    const fields = content.order?.fields || [];
    const closePanel = () => requestProduct('');
    const list = [
      {
        target: '[data-tour="product"]',
        title: 'Escolha o produto',
        content: 'Escolha o produto que deseja pedir. Abra um item do cardápio para configurar.',
        onEnter: async () => {
          closeCart();
          closePanel();
          document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          await sleep(520);
        },
      },
      {
        target: '[data-tour="quantity"]',
        title: 'Quantidade',
        content: 'Aqui você define quantas unidades deseja adicionar ao pedido.',
        onEnter: async () => {
          closeCart();
          requestProduct(firstId);
          await sleep(400);
        },
      },
    ];

    if (optionsProduct?.options?.length) {
      list.push({
        target: '[data-tour="options"]',
        title: 'Opções do produto',
        content: 'Escolha as opções disponíveis para este produto.',
        onEnter: async () => {
          closeCart();
          requestProduct(optionsProduct.id);
          await sleep(400);
        },
      });
    }

    list.push(
      {
        target: '[data-tour="add-cart"]',
        title: 'Adicionar ao carrinho',
        content: 'Quando terminar de configurar o produto, adicione-o ao carrinho.',
        onEnter: async () => {
          closeCart();
          requestProduct(optionsProduct?.id || firstId);
          await sleep(400);
        },
      },
      {
        target: '[data-tour="cart"]',
        title: 'Carrinho',
        content: 'Aqui você pode conferir todos os produtos adicionados ao pedido.',
        onEnter: async () => {
          closePanel();
          closeCart();
          await sleep(160);
        },
      },
      {
        target: '[data-tour="cart-panel"]',
        title: 'Resumo do pedido',
        content: 'Veja produtos, quantidades, opções, preço de cada item, subtotal e total.',
        onEnter: async () => {
          closePanel();
          openCart('summary');
          await sleep(240);
        },
      },
      {
        target: '[data-tour="cart-edit"]',
        title: 'Alterar o pedido',
        content: 'Você pode alterar seu pedido antes de enviá-lo: aumentar, diminuir, remover ou voltar ao cardápio para incluir outros produtos.',
        onEnter: async () => {
          closePanel();
          openCart('summary');
          await sleep(200);
        },
      },
      {
        target: '[data-tour="checkout"]',
        title: 'Finalizar pedido',
        content: 'Quando seu pedido estiver pronto, avance para finalizar.',
        onEnter: async () => {
          closePanel();
          openCart('summary');
          await sleep(200);
        },
      },
    );

    fields.forEach((field) => {
      list.push({
        target: `[data-tour="${field.tour}"]`,
        title: field.label,
        content: field.hint || `Preencha o campo ${field.label}.`,
        onEnter: async () => {
          closePanel();
          openCart('checkout');
          await sleep(240);
        },
      });
    });

    list.push({
      target: '[data-tour="whatsapp"]',
      title: 'Enviar pelo WhatsApp',
      content: 'Ao finalizar, o pedido vira uma mensagem pronta. Você só revisa e envia no WhatsApp.',
      onEnter: async () => {
        closePanel();
        openCart('checkout');
        await sleep(240);
      },
    });

    return list;
  }, [closeCart, content.order, firstId, openCart, optionsProduct, requestProduct]);

  return (
    <OrderTutorial
      open={tutorialActive}
      steps={steps}
      onClose={stopTutorial}
      title="Como fazer um pedido?"
    />
  );
}
