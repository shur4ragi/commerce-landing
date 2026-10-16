import redVelvet from '../../assets/images/fryda/red-velvet.jpg';
import cafeCoado from '../../assets/images/fryda/cafe-coado.jpg';
import tortaCarne from '../../assets/images/fryda/torta-carne.jpg';
import boloChocolateCalda from '../../assets/images/fryda/bolo-chocolate-calda.jpg';
import boloChocolateSorvete from '../../assets/images/fryda/bolo-chocolate-sorvete.jpg';
import cafeDaManha from '../../assets/images/fryda/cafe-da-manha.jpg';
import brownieSorvete from '../../assets/images/fryda/brownie-sorvete.jpg';
import brownie from '../../assets/images/fryda/brownie.jpg';
import cucaBanana from '../../assets/images/fryda/cuca-banana.jpg';
import frappeCaramelo from '../../assets/images/fryda/frappe-caramelo.jpg';
import tortaCookie from '../../assets/images/fryda/torta-cookie.jpg';
import boloCenoura from '../../assets/images/fryda/bolo-cenoura.jpg';
import boloBrigadeiro from '../../assets/images/fryda/bolo-brigadeiro.jpg';
import tortaFrango from '../../assets/images/fryda/torta-frango.jpg';
import quiche from '../../assets/images/fryda/quiche.jpg';
import empanadas from '../../assets/images/fryda/empanadas.jpg';
import mistoQuente from '../../assets/images/fryda/misto-quente.jpg';
import ovosBacon from '../../assets/images/fryda/ovos-bacon.jpg';
import risoto from '../../assets/images/fryda/risoto.jpg';
import latte from '../../assets/images/fryda/latte.jpg';
import latteGelado from '../../assets/images/fryda/latte-gelado.jpg';
import milkshake from '../../assets/images/fryda/milkshake.jpg';
import sodaItaliana from '../../assets/images/fryda/soda-italiana.jpg';
import cafeLaranja from '../../assets/images/fryda/cafe-laranja.jpg';
import boloFrida from '../../assets/images/fryda/bolo-frida.jpg';
import boloMaca from '../../assets/images/fryda/bolo-maca.jpg';
import boloBananaIntegral from '../../assets/images/fryda/bolo-banana-integral.jpg';
import bruschetta from '../../assets/images/fryda/bruschetta.jpg';
import cappuccino from '../../assets/images/fryda/cappuccino.jpg';
import salao from '../../assets/images/fryda/salao.jpg';
import fridaIlustracao from '../../assets/images/fryda/frida-ilustracao.jpg';
import lema from '../../assets/images/fryda/lema.jpg';
import croissantRecheado from '../../assets/images/fryda/croissant-recheado.jpg';
import tortaCamadas from '../../assets/images/fryda/torta-camadas.jpg';

// Conteúdo baseado no Instagram @frydacafe (feed e destaques "Nossas Delícias", "Encomendas",
// "Delivery", "Estacionamento" e "Nasce um sonho"), no perfil do Google e em avaliações públicas.
// Preços fictícios de referência, espelhando os do Leya's; o cardápio oficial com valores está no iFood.
const content = {
  intro: {
    brand: 'Fryda Café',
    eyebrow: 'Fryda Café · Taubaté',
    cta: { label: 'Conhecer', target: '#inicio' },
    slides: [
      {
        image: redVelvet,
        alt: 'Fatia de red velvet com recheio de cream cheese e a xícara do Fryda ao fundo',
        title: 'Red velvet *bem* recheado',
        text: 'Camadas de massa vermelha e recheio cremoso, do jeito que a vitrine pede.',
      },
      {
        image: cafeCoado,
        alt: 'Café coado no coador de pano caindo na xícara do Fryda Café',
        title: 'Café *no* coador de pano',
        text: 'Passado na hora, direto na xícara da casa.',
      },
      {
        image: tortaCarne,
        alt: 'Fatia de torta de carne desfiada com cobertura gratinada',
        title: 'Torta de carne *da* vovó',
        text: 'Carne desfiada e cobertura gratinada, receita de família.',
      },
      {
        image: boloChocolateCalda,
        alt: 'Calda de chocolate sendo despejada sobre uma fatia de bolo',
        title: 'Bolo *com* calda',
        text: 'Bolo de chocolate com calda quente servida na mesa.',
      },
      {
        image: cafeDaManha,
        alt: 'Ovos mexidos com tomatinhos e pão na chapa',
        title: 'Café *da* manhã',
        text: 'Ovos mexidos, pão na chapa e um café para começar o dia.',
      },
      {
        image: brownieSorvete,
        alt: 'Brownie com bola de sorvete e calda de chocolate',
        title: 'Brownie *com* sorvete',
        text: 'Brownie quentinho, sorvete e calda escorrendo.',
      },
      {
        image: cucaBanana,
        alt: 'Fatia de cuca de banana com farofa crocante',
        title: 'Cuca *de* banana',
        text: 'Farofa crocante por cima e banana por dentro.',
      },
      {
        image: frappeCaramelo,
        alt: 'Frappé com chantilly e calda de caramelo no salão do Fryda',
        title: 'Gelados *da* casa',
        text: 'Frappés, milkshakes, lattes gelados e soda italiana.',
      },
    ],
  },

  // Abertura em card: fundo cor de café com grãos, card claro com menu, lettering e o selo da logo.
  cardHero: {
    id: 'inicio',
    eyebrow: 'Centro · Taubaté',
    sticker: 'Viva la vida!',
    title: 'Passado',
    tag: 'na hora',
    storyTitle: 'Nossa história',
    story:
      'Café coado no pano, receitas de família e uma vitrine que a própria equipe come e recomenda. Tudo num café inspirado na Frida Kahlo, no Centro de Taubaté.',
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Como chegar' },
    badgeText: 'Não vamos te vender algo que a gente não comeria',
  },

  // Passo a passo preso na tela: um saquinho percorre a estrada até a casa do cliente.
  journey: {
    id: 'ate-sua-casa',
    eyebrow: 'Passo a passo',
    title: 'Do nosso forno *até* a sua casa.',
    hint: 'Role para acompanhar o pedido',
    done: 'Bom apetite!',
    steps: [
      {
        title: 'Você escolhe',
        text: 'Monte o pedido no iFood ou chame a gente no WhatsApp para encomendas.',
        image: cafeCoado,
        alt: 'Café coado no coador de pano',
        icon: 'phone',
      },
      {
        title: 'A gente prepara',
        text: 'Receita de família saindo do forno e café passado na hora, no coador de pano.',
        image: tortaCarne,
        alt: 'Fatia de torta de carne gratinada',
        icon: 'oven',
      },
      {
        title: 'Embala com carinho',
        text: 'Tudo bem fechado, com o selo da Frida, para chegar como saiu da vitrine.',
        image: boloBrigadeiro,
        alt: 'Bolo de brigadeiro coberto de granulado',
        icon: 'bag',
      },
      {
        title: 'Chega na sua casa',
        text: 'Delivery pelo iFood ou retirada no balcão, com 30 minutos de estacionamento grátis.',
        image: cafeDaManha,
        alt: 'Ovos mexidos com pão na chapa',
        icon: 'home',
      },
    ],
  },

  // "Estamos no Instagram": celular flutuante com o perfil (inspirado na seção da Aflora).
  instagram: {
    id: 'instagram',
    eyebrow: 'Estamos no Instagram',
    title: 'Um café que *dá* vontade de postar.',
    text: 'Bastidores da cozinha, o bolo do dia e as novidades da vitrine. Siga e marque a gente na sua foto.',
    handle: 'frydacafe',
    cta: 'Seguir @frydacafe',
    profile: {
      name: 'Fryda Café',
      followers: '11 mil',
      bio: ['Café · almoço · café da tarde', 'R. Dr. Pedro Costa, 531 · Taubaté', 'Encomendas pelo WhatsApp'],
    },
    highlights: [
      { title: 'Nossas delícias', text: 'O que saiu do forno hoje.', image: redVelvet },
      { title: 'Encomendas', text: 'Bolos e tortas para a sua festa.', image: boloMaca },
      { title: 'Nasce um sonho', text: 'Como o Fryda começou.', image: salao },
    ],
    chips: ['Nova postagem no feed', 'Bolo do dia nos stories'],
    posts: [
      { image: redVelvet, alt: 'Fatia de red velvet com cream cheese' },
      { image: cafeCoado, alt: 'Café coado no coador de pano' },
      { image: boloChocolateCalda, alt: 'Calda de chocolate sobre o bolo' },
      { image: fridaIlustracao, alt: 'Ilustração da Frida tomando café' },
      { image: frappeCaramelo, alt: 'Frappé de caramelo com chantilly' },
      { image: tortaCarne, alt: 'Torta de carne da vovó' },
      { image: lema, alt: 'Cliente tomando café com o lema da casa' },
      { image: brownieSorvete, alt: 'Brownie com sorvete e calda' },
      { image: latte, alt: 'Latte em camadas' },
      { image: cucaBanana, alt: 'Cuca de banana com farofa' },
      { image: salao, alt: 'Salão do Fryda Café' },
      { image: milkshake, alt: 'Milkshake com chantilly e marshmallow' },
    ],
  },

  hero: {
    eyebrow: 'Centro · Taubaté',
    title: 'Não vamos te vender algo que a gente não comeria.',
    highlight: 'que a gente não comeria.',
    description:
      'Café da manhã, almoço e café da tarde num café inspirado na Frida Kahlo, no Centro de Taubaté. Venha tomar um café com a gente, peça pelo iFood ou encomende pelo WhatsApp.',
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Como chegar', href: '#contato', action: 'map' },
    image: cafeCoado,
    imageAlt: 'Café coado no coador de pano caindo na xícara do Fryda Café',
    metrics: [
      { value: '11 mil', label: 'Seguidores no Instagram' },
      { value: '4,6', label: 'Nota no Google' },
      { value: '30 min', label: 'Estacionamento grátis' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'A casa',
    title: 'Um café *com* alma de Frida.',
    text: 'O Fryda nasceu de um sonho montado à mão: parede pintada, xícara com a nossa Frida, máquina de espresso e cada cantinho pensado nos mínimos detalhes. Hoje é um café no Centro de Taubaté com cadeiras vermelhas, quadros da artista e uma vitrine com receitas que a própria equipe come e recomenda.',
    image: salao,
    imageAlt: 'Salão do Fryda Café com cadeiras vermelhas e quadros da Frida Kahlo',
    // Colagem de fotos no lugar da foto única (a primeira é a principal).
    collage: [
      { image: salao, alt: 'Salão do Fryda Café com cadeiras vermelhas e quadros da Frida Kahlo', caption: 'Nosso salão' },
      { image: croissantRecheado, alt: 'Croissant recheado com um cappuccino ao fundo', caption: 'Croissant recheado' },
      { image: tortaCamadas, alt: 'Fatia de torta em camadas com cobertura de chocolate', caption: 'Torta de camadas' },
    ],
    facts: [
      { value: 'Receitas', label: 'De família, feitas na casa' },
      { value: 'Encomendas', label: 'Bolos e tortas pelo WhatsApp' },
      { value: '30 min', label: 'Estacionamento grátis' },
    ],
  },

  statement: {
    id: 'manifesto',
    eyebrow: 'Nosso lema',
    title: 'Feito *para*\ncomer junto.',
    // Fotos das colunas em cascata ao fundo (decorativas).
    images: [
      redVelvet, cafeCoado, tortaCarne, boloChocolateCalda, cafeDaManha, brownieSorvete, cucaBanana, frappeCaramelo,
      tortaCookie, boloCenoura, tortaFrango, quiche, latteGelado, milkshake, sodaItaliana, boloBrigadeiro,
    ],
    lead: 'Não vamos te vender algo que a gente não comeria.',
    text: 'Torta de carne da vovó, torta de frango, quiches, cucas, bolos com calda quente e brownie com sorvete dividem a vitrine com o café coado no pano, o latte e os gelados da casa.',
    // Cobertura na cor da casa escorrendo no hover.
    cta: { label: 'Ver o cardápio', href: '#produtos', style: 'cover' },
  },

  process: {
    id: 'processo',
    label: 'Da cozinha à sua casa',
    steps: [
      {
        lead: 'da',
        word: 'cozinha,',
        title: 'Cozinha',
        text: 'Receitas de família, como a torta de carne da vovó, feitas na casa.',
        image: tortaCarne,
        alt: 'Fatia de torta de carne desfiada com cobertura gratinada',
      },
      {
        lead: 'à',
        word: 'mesa,',
        title: 'Mesa',
        text: 'Café da manhã, almoço e café da tarde servidos no salão.',
        image: cafeDaManha,
        alt: 'Ovos mexidos com tomatinhos e pão na chapa',
      },
      {
        lead: 'à',
        word: 'sua casa.',
        title: 'Sua casa',
        text: 'Bolos e tortas sob encomenda pelo WhatsApp, e delivery pelo iFood.',
        image: boloBrigadeiro,
        alt: 'Bolo de chocolate coberto de granulado',
      },
    ],
  },

  services: {
    id: 'servicos',
    eyebrow: 'Experiências',
    title: 'Do café *ao* delivery.',
    // Painéis grandes de foto que se expandem ao passar o mouse.
    layout: 'panels',
    description: 'Para tomar no salão, pedir em casa ou encomendar para a sua festa.',
    items: [
      {
        title: 'Café da manhã',
        description: 'Ovos mexidos, pão na chapa, misto quente e café coado no pano.',
        image: cafeDaManha,
      },
      {
        title: 'Almoço',
        description: 'Pratos do dia servidos no salão, como risoto e tortas da casa.',
        image: risoto,
      },
      {
        title: 'Café da tarde',
        description: 'Bolos com calda, cucas, brownies e os gelados da casa.',
        image: boloChocolateSorvete,
      },
      {
        title: 'Encomendas',
        description: 'Bolos inteiros e tortas combinados pelo WhatsApp.',
        image: boloMaca,
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'O que tem *na* vitrine.',
    description: 'A vitrine muda ao longo da semana. Preços de referência; confirme os valores no balcão ou no iFood.',
    viewAllLabel: 'Ver todos',
    // Cardápio de papel desenhado, caído ao fundo da seção.
    paperMenu: true,
    savedLabel: 'Salvos',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um item e toque em salvar para guardar.',
    items: [
      // ---------- Cafés ----------
      { id: 'cafe-coado', category: 'Cafés', title: 'Café coado no pano', description: 'Passado na hora, no coador de pano.', price: 'R$ 10,90', image: cafeCoado, featured: true },
      { id: 'cappuccino', category: 'Cafés', title: 'Cappuccino', description: 'Servido na xícara da casa.', price: 'R$ 10,90', image: cappuccino },
      { id: 'latte', category: 'Cafés', title: 'Latte', description: 'Espresso e leite vaporizado em camadas.', price: 'R$ 10,90', image: latte },
      { id: 'cafe-laranja', category: 'Cafés', title: 'Café com suco de laranja', description: 'Espresso sobre suco de laranja, com rodela da fruta.', price: 'R$ 12', image: cafeLaranja },

      // ---------- Gelados ----------
      { id: 'frappe-caramelo', category: 'Gelados', title: 'Frappé de caramelo', description: 'Com chantilly e calda de caramelo.', price: 'R$ 19', image: frappeCaramelo, featured: true },
      { id: 'latte-gelado', category: 'Gelados', title: 'Latte gelado', description: 'Espresso, leite gelado e espuma.', price: 'R$ 19', image: latteGelado },
      { id: 'milkshake', category: 'Gelados', title: 'Milkshake', description: 'Com chantilly, calda e marshmallow.', price: 'R$ 19', image: milkshake },
      { id: 'soda-italiana', category: 'Gelados', title: 'Soda italiana', description: 'Refrescante, servida no pote de vidro.', price: 'R$ 14', image: sodaItaliana },

      // ---------- Café da manhã e almoço ----------
      { id: 'ovos-pao-chapa', category: 'Café da manhã e almoço', title: 'Ovos mexidos com pão na chapa', description: 'Ovos cremosos, tomatinhos e pão na chapa.', price: 'R$ 19', image: cafeDaManha, featured: true },
      { id: 'ovos-bacon', category: 'Café da manhã e almoço', title: 'Ovos com bacon', description: 'Ovos mexidos com bacon e pão na chapa.', price: 'R$ 22', image: ovosBacon },
      { id: 'misto-quente', category: 'Café da manhã e almoço', title: 'Misto quente', description: 'Presunto e queijo no pão na chapa.', price: 'R$ 15', image: mistoQuente },
      { id: 'risoto', category: 'Café da manhã e almoço', title: 'Risoto do dia', description: 'Servido no almoço. Consulte o sabor do dia.', price: 'R$ 29,90', image: risoto },

      // ---------- Salgados ----------
      { id: 'torta-carne', category: 'Salgados', title: 'Torta de carne da vovó', description: 'Carne desfiada com cobertura gratinada.', price: 'R$ 22', image: tortaCarne, featured: true },
      { id: 'torta-frango', category: 'Salgados', title: 'Torta de frango', description: 'Massa dourada e recheio cremoso de frango.', price: 'R$ 22', image: tortaFrango, featured: true },
      { id: 'quiche', category: 'Salgados', title: 'Quiche', description: 'Massa amanteigada e recheio gratinado.', price: 'R$ 15', image: quiche },
      { id: 'croissant-recheado', category: 'Salgados', title: 'Croissant recheado', description: 'Crocante por fora, macio por dentro e com recheio cremoso.', price: 'R$ 22', image: croissantRecheado, featured: true },
      { id: 'empanadas', category: 'Salgados', title: 'Empanadas argentinas', description: 'Assadas e douradas.', price: 'R$ 15', image: empanadas },
      { id: 'bruschetta', category: 'Salgados', title: 'Bruschetta', description: 'Pão tostado com creme, tomatinhos e manjericão.', price: 'R$ 24,90', image: bruschetta },

      // ---------- Doces ----------
      { id: 'red-velvet', category: 'Doces', title: 'Red velvet', description: 'Bem recheado, com cream cheese.', price: 'R$ 22,90', image: redVelvet, featured: true },
      { id: 'bolo-chocolate-calda', category: 'Doces', title: 'Bolo de chocolate com calda', description: 'Calda quente servida na mesa.', price: 'R$ 25,90', image: boloChocolateCalda, featured: true },
      { id: 'bolo-chocolate-sorvete', category: 'Doces', title: 'Bolo de chocolate com sorvete', description: 'Fatia com calda e uma bola de sorvete.', price: 'R$ 25', image: boloChocolateSorvete },
      { id: 'brownie-sorvete', category: 'Doces', title: 'Brownie com sorvete', description: 'Brownie quente, sorvete e calda.', price: 'R$ 25', image: brownieSorvete, featured: true },
      { id: 'torta-camadas', category: 'Doces', title: 'Torta de camadas', description: 'Massa de chocolate, creme em camadas e cobertura de chocolate.', price: 'R$ 25,90', image: tortaCamadas, featured: true },
      { id: 'brownie', category: 'Doces', title: 'Brownie', description: 'Com cobertura cremosa de chocolate.', price: 'R$ 16', image: brownie },
      { id: 'cuca-banana', category: 'Doces', title: 'Cuca de banana', description: 'Farofa crocante e banana.', price: 'R$ 15', image: cucaBanana, featured: true },
      { id: 'torta-cookie', category: 'Doces', title: 'Torta cookie', description: 'Massa de cookie com cobertura de chocolate.', price: 'R$ 18', image: tortaCookie },
      { id: 'bolo-cenoura', category: 'Doces', title: 'Bolo de cenoura com chocolate', description: 'Com calda de chocolate por cima.', price: 'R$ 15', image: boloCenoura },
      { id: 'bolo-brigadeiro', category: 'Doces', title: 'Bolo de brigadeiro', description: 'Chocolate coberto de granulado.', price: 'R$ 16', image: boloBrigadeiro },

      // ---------- Encomendas ----------
      { id: 'bolo-maca', category: 'Encomendas', title: 'Bolo de maçã', description: 'Bolo inteiro sob encomenda.', price: 'R$ 79,90', image: boloMaca },
      { id: 'bolo-banana-integral', category: 'Encomendas', title: 'Bolo de banana integral', description: 'Com cobertura. Bolo inteiro sob encomenda.', price: 'R$ 69,90', image: boloBananaIntegral },
    ],
  },

  // Vitrine: cada item leva ao iFood (com preços) ou ao WhatsApp para encomendas e retirada.
  order: {
    simulateLabel: 'Simular pedido',
    addToCartLabel: 'Adicionar ao pedido',
    cartLabel: 'Seu pedido',
    emptyCart: 'Seu pedido ainda está vazio. Escolha um item do cardápio para começar.',
    checkoutLabel: 'Finalizar pedido',
    backToCartLabel: 'Voltar ao pedido',
    sendLabel: 'Enviar pedido pelo WhatsApp',
    quantityLabel: 'Quantidade',
    itemObservationLabel: 'Observação do item',
    paymentMethods: ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
    // O pedido pelo site é para retirada; entrega fica com o iFood / WhatsApp.
    delivery: {
      title: 'Quer receber em casa?',
      text: 'O pedido pelo site é para retirar no balcão. Para entrega, peça pelo iFood ou pelo WhatsApp.',
      links: [
        {
          label: 'Pedir entrega no WhatsApp',
          type: 'whatsapp',
          message: 'Olá, Fryda Café! Quero fazer um pedido para entrega.',
        },
        {
          label: 'Pedir no iFood',
          type: 'ifood',
          href: 'https://www.ifood.com.br/delivery/taubate-sp/fryda-cafe-centro/653e8b79-c35f-4094-9ea2-a7fb308f0cef',
        },
      ],
    },
    fields: [
      { id: 'name', key: 'name', label: 'Nome', required: true, tour: 'customer-name', placeholder: 'Como devemos te chamar', hint: 'Informe seu nome para o Fryda saber quem fez o pedido.' },
      { id: 'phone', key: 'phone', label: 'Telefone', type: 'tel', required: true, tour: 'customer-phone', mask: '(99) 9999-9999|(99) 99999-9999', maskType: 'number', placeholder: '(12) 99999-9999', hint: 'Informe um telefone para confirmarmos o pedido.' },
      { id: 'paymentMethod', key: 'paymentMethod', label: 'Forma de pagamento', type: 'select', required: true, tour: 'customer-payment', hint: 'Escolha como pretende pagar.' },
      { id: 'observation', key: 'observation', label: 'Observações', type: 'textarea', required: false, tour: 'customer-observation', placeholder: 'Ex.: bolo inteiro para sábado, horário de retirada', hint: 'Use este campo para encomendas e pedidos especiais.' },
    ],
    // Links usados só no modo vitrine (features.ordering: false).
    links: [
      {
        label: 'Pedir no iFood',
        type: 'ifood',
        href: 'https://www.ifood.com.br/delivery/taubate-sp/fryda-cafe-centro/653e8b79-c35f-4094-9ea2-a7fb308f0cef',
      },
      {
        label: 'Encomendar pelo WhatsApp',
        shortLabel: 'Encomendas',
        type: 'whatsapp',
        message: 'Olá, Fryda Café! Vim pelo site e gostaria de fazer uma encomenda. {item}',
      },
    ],
  },

  gallery: {
    id: 'galeria',
    eyebrow: 'Galeria',
    title: 'O Fryda *por* dentro.',
    items: [
      { title: 'Nosso salão', image: salao, alt: 'Salão com cadeiras vermelhas, quadros da Frida e balcão ao fundo' },
      { title: 'A Frida da casa', image: fridaIlustracao, alt: 'Ilustração da Frida Kahlo tomando café' },
      { title: 'Nosso lema', image: lema, alt: 'Cliente tomando café com a frase: não vamos te vender algo que a gente não comeria' },
      { title: 'Café da tarde', image: boloFrida, alt: 'Bolo de chocolate com calda ao lado de um vaso da Frida' },
      { title: 'Bem-vindo', image: latte, alt: 'Latte em camadas diante da lousa de boas-vindas' },
      { title: 'Latte gelado', image: latteGelado, alt: 'Latte gelado com espuma na luz da tarde' },
      {
        title: 'Torta cookie',
        image: tortaCookie,
        alt: 'Fatia de torta cookie com cobertura de chocolate e a xícara do Fryda ao fundo',
        wide: true,
      },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: 'Por que o Fryda',
    title: 'Motivos *para* voltar.',
    items: [
      { title: 'Receitas de família', description: 'Torta de carne da vovó, empadão da Tia Branca e bolos feitos na casa.' },
      { title: 'Um café com a Frida', description: 'Quadros, cores e cadeiras vermelhas: um café com personalidade.' },
      { title: 'Estacionamento grátis', description: 'Gratuito por 30 minutos para clientes.' },
      { title: 'Delivery e encomendas', description: 'Delivery pelo iFood; retirada e encomendas pelo WhatsApp.' },
    ],
  },

  // Avaliações reais do Google (nota geral e comentários públicos).
  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Avaliações no Google',
    title: 'Quem vem, *volta*.',
    // Até 4 comentários reais do perfil no Google aparecem na seção "reviews".
    rating: {
      value: '4,6',
      count: 'Mais de 360 avaliações',
      place: 'Fryda Café · Centro, Taubaté',
      source: 'Google',
      href: 'https://www.google.com/maps/search/?api=1&query=Fryda%20Caf%C3%A9%20R.%20Dr.%20Pedro%20Costa%20531%20Taubat%C3%A9',
      linkLabel: 'Ver todas no Google',
    },
    // Os 3 primeiros aparecem na seção "reviews"; os demais ficam de reserva.
    items: [
      {
        name: 'Ana Beatriz C.',
        role: 'Local Guide · Google',
        stars: 5,
        quote:
          'Virou, sem sombra de dúvidas, o meu café favorito em Taubaté. Nunca comi uma torta basca tão gostosa: cremosa e firme no ponto certo. Simplesmente fenomenal.',
      },
      {
        name: 'Tiago A.',
        role: 'Local Guide · Google',
        stars: 5,
        quote:
          'Lindo café, ambiente super agradável, café bem tirado e comidas deliciosas. Maria, a dona, é um amor de pessoa, super atenciosa e bem-humorada. Esse bolo de chocolate belga é a melhor coisa que comi em Taubaté!',
      },
      {
        name: 'Mexx',
        role: 'Local Guide · Google',
        stars: 5,
        quote:
          'Primeira vez que visitei o local. Lugar muito maravilhoso. Assim como muitos dizem, a torta de frango é excepcional. Prometo voltar mais vezes.',
      },
      {
        name: 'Aline M.',
        role: 'Avaliação no Google',
        stars: 5,
        quote:
          'Um dos melhores lugares que já conheci!!! O ambiente é simplesmente maravilhoso, muito aconchegante, bonito e agradável... toda a equipe é extremamente atenciosa.',
      },
      {
        name: 'Raissa S.',
        role: 'Avaliação no Google',
        stars: 5,
        quote: 'Fui conhecer o almoço do Fryda Café e gostei muito do risoto que serviram. Estava muito bom!',
      },
      {
        // Avaliação real no Google, mantida no original (cliente de Miami).
        name: 'Joaquin S.',
        role: 'Avaliação no Google · de Miami',
        stars: 5,
        quote: 'We came from Miami and this place is amazing!!! The coffee and the omelette!!! Highly recommended!!!',
      },
    ],
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Passe *aqui* ou peça pelo iFood.',
    description:
      'Estamos na Rua Dr. Pedro Costa, no Centro de Taubaté, com estacionamento grátis por 30 minutos. Retirada e encomendas pelo WhatsApp; delivery pelo iFood.',
    form: {
      nameLabel: 'Nome',
      phoneLabel: 'WhatsApp',
      messageLabel: 'Mensagem',
      submitLabel: 'Enviar pelo WhatsApp',
      consent: 'Autorizo o contato pelo WhatsApp.',
    },
    // Formulário final (CoffeeContact): a comanda entra no saquinho, que fecha com o selo da casa.
    order: {
      title: 'Vamos passar *um* café?',
      text: 'Conte o que você precisa: a gente anota na comanda, fecha o saquinho e você envia pelo WhatsApp.',
      types: ['Encomenda de bolo', 'Torta inteira', 'Retirada no balcão', 'Outro assunto'],
      typeLegend: 'Sobre o que é?',
      dateLabel: 'Para quando?',
      messagePlaceholder: 'Ex.: bolo de brigadeiro para 15 pessoas, retirar às 16h',
      concludeLabel: 'Fechar a comanda',
      closingLabel: 'Fechando o saquinho…',
      sendLabel: 'Enviar pelo WhatsApp',
      editLabel: 'Editar',
      hints: {
        open: 'Sua comanda está sendo anotada…',
        closing: 'Fechando o saquinho…',
        closed: 'Pedido embalado e quentinho, é só enviar!',
      },
    },
  },
};

export default content;
