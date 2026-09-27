import heroImage from '../../assets/images/hero-cup.png';
import aboutImage from '../../assets/images/about-space.png';
import gallery1 from '../../assets/images/gallery-01.png';
import gallery2 from '../../assets/images/gallery-02.png';
import gallery3 from '../../assets/images/gallery-03.png';
import gallery4 from '../../assets/images/gallery-04.png';
import gallery5 from '../../assets/images/gallery-05.png';
import gallery6 from '../../assets/images/gallery-06.png';
import productEspresso from '../../assets/images/product-espresso.png';
import productBrunch from '../../assets/images/product-brunch.png';
import productPastry from '../../assets/images/product-pastry.png';
import productFilter from '../../assets/images/product-filter.png';
import productCortado from '../../assets/images/product-cortado.png';
import productColdbrew from '../../assets/images/product-coldbrew.png';
import productCookie from '../../assets/images/product-cookie.png';
import productBeans from '../../assets/images/product-beans.png';
import productEggs from '../../assets/images/product-eggs.png';

const content = {
  intro: {
    brand: 'Fryda Café',
    eyebrow: 'Fryda Café · Taubaté',
    cta: { label: 'Conhecer', target: '#inicio' },
    slides: [
      {
        image: gallery1, // [FOTO: balcão de atendimento da Fryda]
        alt: 'Balcão de atendimento da Fryda Café',
        title: 'A *Frydinha* te espera',
        text: 'Um cantinho aconchegante no centro de Taubaté, com café feito com carinho e doces que conquistam.',
      },
      {
        image: productPastry, // [FOTO: torta de frango da Fryda]
        alt: 'Torta de frango cremosa',
        title: 'Torta de frango *famosa*',
        text: 'Massa leve, recheio cremoso e tempero perfeito. A busca pela melhor torta da cidade termina aqui.',
      },
      {
        image: gallery3, // [FOTO: vitrine de bolos e tortas]
        alt: 'Vitrine com bolos e sobremesas',
        title: 'Vitrine de *delícias*',
        text: 'Bolos, tortas doces e sobremesas que fazem o dia mais gostoso.',
      },
      {
        image: productCortado, // [FOTO: cappuccino da Fryda]
        alt: 'Cappuccino especial',
        title: 'Cappuccino *especial*',
        text: 'Cremoso e na temperatura certa, para aquecer qualquer momento.',
      },
      {
        image: productCookie, // [FOTO: brownie com sorvete]
        alt: 'Brownie com sorvete',
        title: 'Brownie *irresistível*',
        text: 'Quentinho por dentro, com sorvete derretendo por cima. Puro conforto.',
      },
      {
        image: gallery5, // [FOTO: prato de almoço/risoto]
        alt: 'Prato de risoto cremoso',
        title: 'Almoço *de verdade*',
        text: 'Risotos especiais e pratos do dia para quem busca sabor caseiro.',
      },
      {
        image: productColdbrew, // [FOTO: chocolate belga]
        alt: 'Chocolate belga quente',
        title: 'Chocolate *belga*',
        text: 'Intenso e cremoso, feito com chocolate de verdade.',
      },
      {
        image: gallery2, // [FOTO: ambiente interno da Fryda]
        alt: 'Mesa aconchegante no salão',
        title: 'Cantinho *aconchegante*',
        text: 'Decoração caseira e ambiente confortável para ficar à vontade.',
      },
    ],
  },

  hero: {
    eyebrow: 'Centro · Taubaté - SP',
    title: 'Um local aconchegante, com muito amor e café!',
    highlight: 'muito amor e café!',
    description: 'Fryda Café é o cantinho de Taubaté para quem ama café bem feito, tortas deliciosas e um ambiente que acolhe. Venha conhecer a Frydinha!',
    primaryCta: { label: 'Falar no WhatsApp', href: '#contato' },
    secondaryCta: { label: 'Ver cardápio', href: '#produtos' },
    tutorialCta: { label: 'Simular pedido' },
    image: heroImage, // [FOTO: destaque da Fryda - sugestão: fachada ou prato icônico]
    imageAlt: 'Ambiente aconchegante da Fryda Café',
    metrics: [
      { value: '4,6', label: 'Nota no Google' },
      { value: '347+', label: 'Avaliações' },
      { value: '❤️', label: 'Feito com amor' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'Nossa casa',
    title: 'Mais que um café, um *lugar para ficar*.',
    text: 'A Fryda nasceu do amor por café e pela vontade de criar um espaço onde cada pessoa se sinta em casa. Aqui, servimos cafés especiais, tortas artesanais, bolos caseiros e refeições que aquecem a alma. Nossa decoração caseira e atendimento acolhedor fazem da Frydinha o lugar ideal para um café da tarde, um almoço tranquilo ou um encontro especial.',
    image: aboutImage, // [FOTO: interior da Fryda Café mostrando o ambiente]
    imageAlt: 'Ambiente interno aconchegante da Fryda Café',
    facts: [
      { value: 'Centro', label: 'Localização em Taubaté' },
      { value: 'Aconchegante', label: 'Ambiente decorado com carinho' },
      { value: 'Caseiro', label: 'Sabor de casa em cada prato' },
    ],
  },

  statement: {
    id: 'manifesto',
    eyebrow: 'Feito com amor',
    title: 'Café, carinho e\n*sabor caseiro*.',
    images: [
      gallery1, // [FOTO: balcão]
      productBeans, // [FOTO: grãos de café]
      gallery3, // [FOTO: vitrine]
      productCortado, // [FOTO: café]
      gallery5, // [FOTO: prato]
      productFilter, // [FOTO: café coado]
      gallery2, // [FOTO: ambiente]
      productPastry, // [FOTO: torta]
      heroImage, // [FOTO: destaque]
      productColdbrew, // [FOTO: bebida gelada]
      gallery6, // [FOTO: detalhe do espaço]
      productEspresso, // [FOTO: espresso]
      aboutImage, // [FOTO: salão]
      productCookie, // [FOTO: sobremesa]
      gallery4, // [FOTO: detalhe]
      productBrunch, // [FOTO: prato de almoço]
    ],
    lead: 'Uma cafeteria onde o tempo passa devagar e cada detalhe é pensado para você.',
    text: 'Na Fryda, cada torta é assada com cuidado, cada café é preparado na hora e cada cliente é recebido com um sorriso. É assim que a gente acredita que deve ser: simples, gostoso e verdadeiro.',
    cta: { label: 'Ver o cardápio', href: '#produtos' },
  },

  services: {
    id: 'servicos',
    eyebrow: 'O que oferecemos',
    title: 'Sabores para *cada momento*.',
    description: 'Do café da manhã ao lanche da tarde, temos opções para todos os gostos e ocasiões.',
    items: [
      {
        title: 'Cafés Especiais',
        description: 'Espresso, cappuccino, latte, mocha e filtrados preparados com grãos selecionados.',
        image: productEspresso, // [FOTO: café sendo preparado]
      },
      {
        title: 'Tortas e Bolos',
        description: 'Torta de frango, torta basca, bolo belga, cheesecake e muito mais da nossa confeitaria.',
        image: productPastry, // [FOTO: fatia de torta]
      },
      {
        title: 'Almoço',
        description: 'Risotos especiais, pratos do dia e opções leves para o seu almoço.',
        image: productBrunch, // [FOTO: prato de almoço]
      },
      {
        title: 'Sobremesas',
        description: 'Brownie com sorvete, waffles, cookies e doces artesanais.',
        image: productCookie, // [FOTO: sobremesa]
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'Nossas *delícias* te esperam.',
    description: 'Confira alguns dos nossos destaques. Preços e disponibilidade sujeitos a alteração.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    orderLabel: 'Pedir no WhatsApp',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um produto e toque em salvar para guardar.',
    items: [
      {
        id: 'espresso',
        category: 'Cafés',
        title: 'Espresso',
        description: 'Café concentrado e encorpado, base para várias bebidas.',
        details: 'Extração clássica, sabor intenso.',
        price: 'R$ 9',
        image: productEspresso, // [FOTO: espresso da Fryda]
      },
      {
        id: 'cappuccino-especial',
        category: 'Cafés',
        title: 'Cappuccino Especial',
        description: 'Espresso com leite vaporizado e espuma cremosa.',
        details: 'Servido na temperatura ideal.',
        price: 'R$ 15',
        image: productCortado, // [FOTO: cappuccino da Fryda]
      },
      {
        id: 'cappuccino-tradicional',
        category: 'Cafés',
        title: 'Cappuccino Tradicional',
        description: 'Versão clássica do nosso cappuccino.',
        details: 'Equilíbrio perfeito entre café e leite.',
        price: 'R$ 12',
        image: productCortado, // [FOTO: cappuccino]
      },
      {
        id: 'mocha',
        category: 'Cafés',
        title: 'Mocha',
        description: 'Espresso com chocolate e leite vaporizado.',
        details: 'Para quem ama a combinação café e chocolate.',
        price: 'R$ 16',
        image: productEspresso, // [FOTO: mocha]
      },
      {
        id: 'latte',
        category: 'Cafés',
        title: 'Latte',
        description: 'Café com bastante leite vaporizado, suave e cremoso.',
        details: 'Ideal para quem prefere um café mais leve.',
        price: 'R$ 12',
        image: productCortado, // [FOTO: latte]
      },
      {
        id: 'chocolate-quente',
        category: 'Bebidas',
        title: 'Chocolate Quente',
        description: 'Chocolate belga cremoso e reconfortante.',
        details: 'Feito com chocolate de verdade.',
        price: 'R$ 16',
        image: productColdbrew, // [FOTO: chocolate quente da Fryda]
      },
      {
        id: 'coado-casa',
        category: 'Cafés',
        title: 'Coado da Casa',
        description: 'Café filtrado tradicional, feito na hora.',
        details: 'Sabor clássico brasileiro.',
        price: 'R$ 7',
        image: productFilter, // [FOTO: café coado]
      },
      {
        id: 'v60',
        category: 'Cafés',
        title: 'V60',
        description: 'Método de filtragem que realça as nuances do grão.',
        details: 'Para apreciadores de café especial.',
        price: 'R$ 12',
        image: productFilter, // [FOTO: V60]
      },
      {
        id: 'torta-frango',
        category: 'Salgados',
        title: 'Torta de Frango',
        description: 'Massa leve e recheio cremoso com tempero caseiro.',
        details: 'Uma das mais pedidas da casa. A fatia que conquista na primeira garfada.',
        price: '[PREÇO]',
        image: productPastry, // [FOTO: torta de frango da Fryda]
      },
      {
        id: 'quiche',
        category: 'Salgados',
        title: 'Quiche',
        description: 'Torta salgada com recheio cremoso.',
        details: 'Consultar sabores disponíveis.',
        price: 'R$ 15',
        image: productEggs, // [FOTO: quiche]
      },
      {
        id: 'croissant',
        category: 'Salgados',
        title: 'Croissant',
        description: 'Folhado amanteigado servido com manteiga e geleia.',
        details: 'Crocante por fora, macio por dentro.',
        price: 'R$ 15',
        image: productPastry, // [FOTO: croissant]
      },
      {
        id: 'pao-queijo',
        category: 'Salgados',
        title: 'Pão de Queijo (porção)',
        description: 'Porção de pães de queijo quentinhos.',
        details: 'Receita mineira tradicional.',
        price: 'R$ 18',
        image: productBrunch, // [FOTO: pão de queijo]
      },
      {
        id: 'risoto',
        category: 'Almoço',
        title: 'Risoto do Dia',
        description: 'Risoto cremoso com ingredientes selecionados.',
        details: 'Sabores variam conforme o dia. Consulte disponibilidade.',
        price: '[PREÇO]',
        image: productBrunch, // [FOTO: risoto da Fryda]
      },
      {
        id: 'torta-basca',
        category: 'Sobremesas',
        title: 'Torta Basca',
        description: 'Base cremosa de cream cheese coberta com frutas vermelhas.',
        details: 'Textura que derrete na boca.',
        price: '[PREÇO]',
        image: productPastry, // [FOTO: torta basca da Fryda]
      },
      {
        id: 'bolo-belga',
        category: 'Sobremesas',
        title: 'Bolo Belga',
        description: 'Bolo macio e intenso com calda de chocolate.',
        details: 'Para os amantes de chocolate.',
        price: '[PREÇO]',
        image: productCookie, // [FOTO: bolo belga da Fryda]
      },
      {
        id: 'brownie-sorvete',
        category: 'Sobremesas',
        title: 'Brownie com Sorvete',
        description: 'Brownie quentinho servido com sorvete.',
        details: 'Combinação perfeita de quente e gelado.',
        price: '[PREÇO]',
        image: productCookie, // [FOTO: brownie com sorvete]
      },
      {
        id: 'waffle',
        category: 'Sobremesas',
        title: 'Waffle',
        description: 'Waffle crocante com coberturas à escolha.',
        details: 'Consultar opções de acompanhamentos.',
        price: '[PREÇO]',
        image: productPastry, // [FOTO: waffle]
      },
      {
        id: 'torta-cookie',
        category: 'Sobremesas',
        title: 'Torta de Cookie',
        description: 'Cookie gigante em formato de torta.',
        details: 'Para dividir ou não, você decide.',
        price: '[PREÇO]',
        image: productCookie, // [FOTO: torta de cookie]
      },
      {
        id: 'torta-nutella',
        category: 'Sobremesas',
        title: 'Torta Recheada com Nutella',
        description: 'Torta com generoso recheio de Nutella.',
        details: 'Indulgência pura.',
        price: '[PREÇO]',
        image: productPastry, // [FOTO: torta de Nutella]
      },
      {
        id: 'cheesecake-basco',
        category: 'Sobremesas',
        title: 'Cheesecake Basco',
        description: 'Cheesecake cremoso estilo basco.',
        details: 'Textura única e sabor marcante.',
        price: '[PREÇO]',
        image: productPastry, // [FOTO: cheesecake basco]
      },
    ],
  },

  order: {
    simulateLabel: 'Simular pedido',
    addToCartLabel: 'Adicionar ao pedido',
    cartLabel: 'Seu pedido',
    emptyCart: 'Seu pedido ainda está vazio. Escolha um produto para começar.',
    checkoutLabel: 'Finalizar pedido',
    backToCartLabel: 'Voltar ao pedido',
    sendLabel: 'Enviar pedido pelo WhatsApp',
    quantityLabel: 'Quantidade',
    itemObservationLabel: 'Observação do item',
    paymentMethods: ['Pix', 'Cartão', 'Dinheiro'],
    fields: [
      {
        id: 'name',
        key: 'name',
        label: 'Nome',
        required: true,
        tour: 'customer-name',
        placeholder: 'Como devemos te chamar',
        hint: 'Informe seu nome para que a Fryda saiba quem realizou o pedido.',
      },
      {
        id: 'phone',
        key: 'phone',
        label: 'Telefone',
        type: 'tel',
        required: true,
        tour: 'customer-phone',
        mask: '(99) 9999-9999|(99) 99999-9999',
        maskType: 'number',
        placeholder: '(12) 99999-9999',
        hint: 'Informe um telefone para a Fryda confirmar o pedido.',
      },
      {
        id: 'address',
        key: 'address',
        label: 'Endereço',
        required: true,
        tour: 'customer-address',
        placeholder: 'Rua, avenida ou local de entrega',
        hint: 'Informe a rua ou o local de entrega.',
      },
      {
        id: 'number',
        key: 'number',
        label: 'Número',
        required: true,
        tour: 'customer-number',
        maskType: 'number',
        placeholder: '123',
        hint: 'Informe o número do endereço.',
      },
      {
        id: 'complement',
        key: 'complement',
        label: 'Complemento',
        required: false,
        tour: 'customer-complement',
        placeholder: 'Apto, bloco ou referência',
        hint: 'Se quiser, acrescente complemento, bloco ou referência.',
      },
      {
        id: 'paymentMethod',
        key: 'paymentMethod',
        label: 'Forma de pagamento',
        type: 'select',
        required: true,
        tour: 'customer-payment',
        hint: 'Escolha como pretende pagar.',
      },
      {
        id: 'observation',
        key: 'observation',
        label: 'Observações',
        type: 'textarea',
        required: false,
        tour: 'customer-observation',
        placeholder: 'Ex.: sem açúcar, pegar no balcão',
        hint: 'Use este campo para pedidos especiais.',
      },
    ],
  },

  gallery: {
    id: 'galeria',
    eyebrow: 'Galeria',
    title: 'Conheça o *nosso cantinho*.',
    items: [
      { title: 'Fachada', image: gallery1, alt: '[FOTO: fachada da Fryda Café]' },
      { title: 'Ambiente interno', image: gallery2, alt: '[FOTO: salão interno da Fryda]' },
      { title: 'Vitrine de doces', image: gallery3, alt: '[FOTO: vitrine com tortas e bolos]' },
      { title: 'Balcão de café', image: gallery4, alt: '[FOTO: balcão de preparo de café]' },
      { title: 'Nossa decoração', image: gallery5, alt: '[FOTO: detalhe da decoração caseira]' },
      { title: 'Cantinho especial', image: gallery6, alt: '[FOTO: cantinho aconchegante do café]' },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: 'Por que a Fryda',
    title: 'O que faz a *diferença*.',
    items: [
      { title: 'Ambiente aconchegante', description: 'Decoração caseira e espaço confortável para você se sentir em casa.' },
      { title: 'Feito com amor', description: 'Cada receita é preparada com carinho e atenção aos detalhes.' },
      { title: 'Tortas famosas', description: 'Nossas tortas salgadas e doces são conhecidas em toda Taubaté.' },
      { title: 'Acessibilidade', description: 'Espaço acessível para cadeirantes. Todos são bem-vindos!' },
    ],
  },

  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Quem nos visita',
    title: 'O que dizem *da Fryda*.',
    items: [
      {
        name: '[NOME CLIENTE 1]',
        role: 'Cliente',
        quote: '[DEPOIMENTO REAL - aguardando autorização do cliente]',
      },
      {
        name: '[NOME CLIENTE 2]',
        role: 'Cliente',
        quote: '[DEPOIMENTO REAL - aguardando autorização do cliente]',
      },
      {
        name: '[NOME CLIENTE 3]',
        role: 'Cliente',
        quote: '[DEPOIMENTO REAL - aguardando autorização do cliente]',
      },
    ],
  },

  cta: {
    title: 'Venha conhecer *a Frydinha*!',
    description: 'Estamos no centro de Taubaté esperando sua visita. Chame no WhatsApp para saber mais.',
    buttonLabel: 'Falar no WhatsApp',
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Visite ou fale com a gente.',
    description: 'Estamos na Rua Dr. Pedro Costa, 547, Centro de Taubaté. Atendemos de segunda a sexta das 9h às 19h e sábados das 9h às 18h.',
    form: {
      nameLabel: 'Nome',
      phoneLabel: 'WhatsApp',
      messageLabel: 'Mensagem',
      submitLabel: 'Enviar pelo WhatsApp',
      consent: 'Autorizo o contato para mais informações.',
    },
  },
};

export default content;
