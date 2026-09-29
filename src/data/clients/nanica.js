import banoffeeInteira from '../../assets/images/nanica/banoffee-inteira.jpg';
import banoffeeFatia from '../../assets/images/nanica/banoffee-fatia.jpg';
import banoffeeJunina from '../../assets/images/nanica/banoffee-junina.jpg';
import banoffeeJuninaFatia from '../../assets/images/nanica/banoffee-junina-fatia.jpg';
import bombonoffee from '../../assets/images/nanica/bombonoffee.jpg';
import monoffee from '../../assets/images/nanica/monoffee.jpg';
import monoffeeCorte from '../../assets/images/nanica/monoffee-corte.jpg';
import uvoffeeFatia from '../../assets/images/nanica/uvoffee-fatia.jpg';
import uvoffeeInteira from '../../assets/images/nanica/uvoffee-inteira.jpg';
import tortaNutella from '../../assets/images/nanica/torta-nutella.jpg';
import doisMousses from '../../assets/images/nanica/dois-mousses.jpg';
import limonadaCoco from '../../assets/images/nanica/limonada-coco.jpg';
import limonadaCopa from '../../assets/images/nanica/limonada-copa.jpg';
import copoFelicidade from '../../assets/images/nanica/copo-felicidade.jpg';
import fondueMorango from '../../assets/images/nanica/fondue-morango.jpg';
import fondueUva from '../../assets/images/nanica/fondue-uva.jpg';
import coxinhas from '../../assets/images/nanica/coxinhas.jpg';
import coxinhaAberta from '../../assets/images/nanica/coxinha-aberta.jpg';
import paoDeQueijo from '../../assets/images/nanica/pao-de-queijo.jpg';
import paoDeQueijoAberto from '../../assets/images/nanica/pao-de-queijo-aberto.jpg';
import salao from '../../assets/images/nanica/salao.jpg';
import logoCompleto from '../../assets/images/nanica/logo-completo.png';

// Bebidas com leite: o cardápio permite trocar por leite vegetal (+ R$ 4).
const milkOption = {
  id: 'leite',
  label: 'Leite',
  type: 'single',
  required: true,
  choices: [
    { id: 'integral', label: 'Integral', price: 0 },
    { id: 'vegetal', label: 'Vegetal', price: 4 },
  ],
};

// Fatias de torta: "Você ainda pode adicionar um topping por R$ 4".
const toppingOption = {
  id: 'topping',
  label: 'Topping',
  type: 'multi',
  choices: [{ id: 'topping', label: 'Adicionar topping (escolha no balcão)', price: 4 }],
};

// Tortas inteiras: preço base é a Média (6 fatias); a Grande (12 fatias) soma a diferença.
function wholePie(id, title, description, medium, large, image) {
  return {
    id,
    category: 'Pra compartilhar',
    title,
    description,
    details: 'Média: 6 fatias · Grande: 12 fatias.',
    price: `R$ ${medium}`,
    image,
    options: [
      {
        id: 'tamanho',
        label: 'Tamanho',
        type: 'single',
        required: true,
        choices: [
          { id: 'media', label: 'Média (6 fatias)', price: 0 },
          { id: 'grande', label: 'Grande (12 fatias)', price: large - medium },
        ],
      },
    ],
  };
}

// Conteúdo do Instagram @nanica.sp.taubate e do cardápio oficial (PDF do link da bio).
const content = {
  // Abertura em vinheta (seção 'rain'): chuva de bananas, "NANICA" no meio com a banana no
  // lugar do I, e depois o painel pastel com a mensagem entre duas pilastras de chuva.
  rain: {
    id: 'apresentacao',
    ariaLabel: 'Abertura da Nanica Taubaté',
    word: 'NANICA',
    bananaIndex: 3,
    // Traço fino e condensado, como as letras do logo.
    wordFont: '"Amatic SC", var(--font-display)',
    panelColor: '#FFF1C7',
    logo: logoCompleto,
    logoAlt: 'Nanica',
    eyebrow: 'Nanica · Jardim Eulália · Taubaté',
    title: 'A melhor *Banoffee* do Brasil.',
    text: 'Seis tortas da casa em fatia ou inteiras, café e salgados. Balcão aberto todos os dias e delivery até as 22h.',
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Conhecer a casa', href: '#inicio' },
  },

  hero: {
    eyebrow: 'Jardim Eulália · Taubaté',
    title: 'Amizade boa não é reta, é torta!',
    highlight: 'é torta!',
    description:
      'A Nanica chegou a Taubaté com a Banoffee que virou referência no Brasil e mais cinco tortas da casa. Fatia no balcão, torta inteira pra dividir e delivery até as 22h.',
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Como chegar', href: '#contato', action: 'map' },
    tutorialCta: { label: 'Simular pedido' },
    image: banoffeeFatia,
    imageAlt: 'Fatia de Banoffee em prato preto, com caixinhas de fatia da Nanica ao fundo',
    metrics: [
      { value: '16,9 mil', label: 'Seguidores no Instagram' },
      { value: '8h às 22h', label: 'Balcão aberto' },
      { value: '6 tortas', label: 'Em fatia ou inteiras' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'A casa',
    title: 'Uma doceria *pra* dividir.',
    text: 'A Nanica nasceu da Banoffee: doce de leite, banana e chantilly sobre uma base crocante. A receita virou marca, ganhou irmãs com morango, uva, Nutella e limão, e agora tem casa no Jardim Eulália. Aqui a fatia vem na caixinha em formato de torta, a torta inteira vem pronta pra festa e o slogan vale para qualquer mesa: amizade boa não é reta, é torta.',
    image: uvoffeeInteira,
    imageAlt: 'Uvoffee inteira com caixinhas de fatia e o logo da Nanica ao fundo',
    facts: [
      { value: 'Banoffee', label: 'A torta que começou tudo' },
      { value: 'Média e Grande', label: 'Tortas de 6 ou 12 fatias' },
      { value: 'Todos os dias', label: 'Balcão das 8h às 22h' },
    ],
  },

  statement: {
    id: 'manifesto',
    eyebrow: 'Receita da casa',
    title: 'Não é reta,\n*é torta.*',
    // Fotos das colunas em cascata ao fundo (decorativas).
    images: [
      banoffeeInteira,
      monoffee,
      uvoffeeFatia,
      bombonoffee,
      doisMousses,
      limonadaCoco,
      tortaNutella,
      copoFelicidade,
      fondueMorango,
      banoffeeFatia,
      monoffeeCorte,
      coxinhaAberta,
      uvoffeeInteira,
      paoDeQueijo,
      fondueUva,
      banoffeeJuninaFatia,
    ],
    lead: 'Camada por camada, do biscoito ao chantilly.',
    text: 'Base crocante, recheio cremoso, fruta de verdade e chantilly por cima. Cada torta da Nanica é montada em camadas que aparecem inteiras no corte, e é por isso que a primeira foto sempre vem antes da primeira garfada.',
    cta: { label: 'Ver o cardápio', href: '#produtos' },
  },

  process: {
    id: 'processo',
    label: 'Da base à fatia',
    steps: [
      {
        lead: 'da',
        word: 'base,',
        title: 'Base',
        text: 'Massa crocante que segura as camadas do começo ao fim da fatia.',
        image: banoffeeInteira,
        alt: 'Torta Banoffee inteira polvilhada com cacau',
      },
      {
        lead: 'ao',
        word: 'recheio,',
        title: 'Recheio',
        text: 'Doce de leite, leite condensado, Nutella ou mousse: cada torta tem o seu.',
        image: doisMousses,
        alt: 'Camadas de mousse de chocolate branco e meio amargo no corte da torta',
      },
      {
        lead: 'à',
        word: 'fatia.',
        title: 'Fatia',
        text: 'Banana, morango ou uva, chantilly por cima e cacau polvilhado na hora de servir.',
        image: banoffeeFatia,
        alt: 'Fatia de Banoffee com camadas de doce de leite, banana e chantilly',
      },
    ],
  },

  services: {
    id: 'servicos',
    eyebrow: 'Experiências',
    title: 'Uma Nanica *pra* cada momento.',
    description: 'Da fatia com café no balcão à torta inteira que chega na festa.',
    items: [
      {
        title: 'Fatia no balcão',
        description: 'Seis tortas da casa em fatia, com topping extra por R$ 4.',
        image: banoffeeFatia,
      },
      {
        title: 'Torta pra compartilhar',
        description: 'Média com 6 fatias ou Grande com 12, para aniversário e reunião de família.',
        image: uvoffeeInteira,
      },
      {
        title: 'Copos e fondue',
        description: 'Copo da Felicidade, copo de frutas e fondue de chocolate.',
        image: copoFelicidade,
      },
      {
        title: 'Café e salgados',
        description: 'Nanicoffee, cappuccino, coxinha e pão de queijo para acompanhar.',
        image: coxinhas,
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'O que tem *na* vitrine da Nanica.',
    description: 'Cardápio completo em "Ver todos". Preços do cardápio oficial; confirme a disponibilidade no balcão.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    orderLabel: 'Pedir no WhatsApp',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um item e toque em salvar para guardar.',
    items: [
      // ---------- Tortas doces (fatia) ----------
      {
        id: 'banoffee',
        category: 'Tortas doces',
        title: 'Banoffee',
        description: 'Doce de leite, banana e chantilly.',
        price: 'R$ 22',
        image: banoffeeFatia,
        featured: true,
        options: [toppingOption],
      },
      {
        id: 'monoffee',
        category: 'Tortas doces',
        title: 'Monoffee',
        description: 'Leite condensado, morango, chantilly e suspiros.',
        price: 'R$ 25',
        image: monoffee,
        featured: true,
        options: [toppingOption],
      },
      {
        id: 'uvoffee',
        category: 'Tortas doces',
        title: 'Uvoffee',
        description: 'Leite condensado, uvas, chantilly e amêndoas.',
        price: 'R$ 25',
        image: uvoffeeFatia,
        featured: true,
        options: [toppingOption],
      },
      {
        id: 'nutella',
        category: 'Tortas doces',
        title: 'Nutella',
        description: 'Nutella, banana e chantilly.',
        price: 'R$ 24',
        image: tortaNutella,
        featured: true,
        options: [toppingOption],
      },
      {
        id: 'dois-mousses',
        category: 'Tortas doces',
        title: 'Dois Mousses',
        description: 'Mousse de chocolate branco e meio amargo.',
        price: 'R$ 26',
        image: doisMousses,
        featured: true,
        options: [toppingOption],
      },
      {
        id: 'limonada-de-coco',
        category: 'Tortas doces',
        title: 'Limonada de Coco',
        description: 'Creme de limão e mousse aerado de coco.',
        price: 'R$ 26',
        image: limonadaCoco,
        featured: true,
        options: [toppingOption],
      },

      // ---------- Doces ----------
      {
        id: 'copo-felicidade',
        category: 'Doces',
        title: 'Copo da Felicidade',
        description: 'A torta em camadas, servida no copo.',
        details: 'Banoffee R$ 22 · Uvoffee R$ 24 · Monoffee R$ 24 · Moranlove R$ 26.',
        price: 'R$ 22',
        image: copoFelicidade,
        featured: true,
        options: [
          {
            id: 'sabor',
            label: 'Sabor',
            type: 'single',
            required: true,
            choices: [
              { id: 'banoffee', label: 'Banoffee', price: 0 },
              { id: 'uvoffee', label: 'Uvoffee', price: 2 },
              { id: 'monoffee', label: 'Monoffee', price: 2 },
              { id: 'moranlove', label: 'Moranlove', price: 4 },
            ],
          },
        ],
      },
      {
        id: 'fondue',
        category: 'Doces',
        title: 'Fondue',
        description: 'Chocolate e frutas à sua escolha.',
        price: 'R$ 28',
        image: fondueMorango,
        featured: true,
      },
      {
        id: 'waffle-doce',
        category: 'Doces',
        title: 'Waffle doce',
        description: 'Uma fruta e uma cobertura à sua escolha.',
        details: 'Diga a fruta e a cobertura na observação do item.',
        price: 'R$ 16',
      },
      {
        id: 'copo-frutas',
        category: 'Doces',
        title: 'Copo de frutas',
        description: 'Frutas frescas no copo.',
        price: 'R$ 16',
      },

      // ---------- Combos ----------
      {
        id: 'o-basico',
        category: 'Combos',
        title: 'O Básico',
        description: 'Uma fatia de Banoffee e uma dose de café espresso.',
        price: 'R$ 25',
      },
      {
        id: 'experiencia-nanica',
        category: 'Combos',
        title: 'Experiência Nanica',
        description: 'Torta e bebida da casa com 15% off.',
        details: 'Banoffee + Nanicoffee ou Monoffee + Moranlatte, com 15% de desconto sobre os itens avulsos.',
        price: 'R$ 32,30',
        options: [
          {
            id: 'dupla',
            label: 'Dupla',
            type: 'single',
            required: true,
            choices: [
              { id: 'banoffee-nanicoffee', label: 'Banoffee e Nanicoffee', price: 0 },
              { id: 'monoffee-moranlatte', label: 'Monoffee e Moranlatte', price: 4.25 },
            ],
          },
        ],
      },

      // ---------- Pra compartilhar (tortas inteiras) ----------
      wholePie('banoffee-inteira', 'Banoffee inteira', 'Doce de leite, banana e chantilly.', 110, 185, banoffeeInteira),
      wholePie('monoffee-inteira', 'Monoffee inteira', 'Leite condensado, morango, chantilly e suspiros.', 145, 240, monoffeeCorte),
      wholePie('uvoffee-inteira', 'Uvoffee inteira', 'Leite condensado, uvas, chantilly e amêndoas.', 145, 240, uvoffeeInteira),
      wholePie('nutella-inteira', 'Nutella inteira', 'Nutella, banana e chantilly.', 125, 210),
      wholePie('dois-mousses-inteira', 'Dois Mousses inteira', 'Mousse de chocolate branco e meio amargo.', 150, 250),
      wholePie('limonada-coco-inteira', 'Limonada de Coco inteira', 'Creme de limão e mousse aerado de coco.', 150, 250),

      // ---------- Bebidas geladas ----------
      {
        id: 'nanicoffee',
        category: 'Bebidas geladas',
        title: 'Nanicoffee',
        description: 'Espresso, leite, doce de leite e chantilly.',
        price: 'R$ 16',
        options: [milkOption],
      },
      {
        id: 'moranlatte',
        category: 'Bebidas geladas',
        title: 'Moranlatte',
        description: 'Leite, calda de morango, Nutella e chantilly.',
        price: 'R$ 18',
        options: [milkOption],
      },
      {
        id: 'pink-lemonade',
        category: 'Bebidas geladas',
        title: 'Pink Lemonade',
        description: 'Com calda de morango e limão siciliano.',
        price: 'R$ 14',
      },
      {
        id: 'cha-gelado',
        category: 'Bebidas geladas',
        title: 'Chá gelado',
        description: 'Chá mate, chá mate com limão ou chá de limão.',
        price: 'R$ 14',
        options: [
          {
            id: 'sabor',
            label: 'Sabor',
            type: 'single',
            required: true,
            choices: [
              { id: 'mate', label: 'Chá mate', price: 0 },
              { id: 'mate-limao', label: 'Chá mate com limão', price: 0 },
              { id: 'limao', label: 'Chá de limão', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'soda-italiana',
        category: 'Bebidas geladas',
        title: 'Soda italiana',
        description: 'Água com gás e calda de morango ou limão siciliano.',
        price: 'R$ 14',
        options: [
          {
            id: 'calda',
            label: 'Calda',
            type: 'single',
            required: true,
            choices: [
              { id: 'morango', label: 'Morango', price: 0 },
              { id: 'limao-siciliano', label: 'Limão siciliano', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'agua',
        category: 'Bebidas geladas',
        title: 'Água',
        description: 'Com ou sem gás.',
        price: 'R$ 6',
        options: [
          {
            id: 'tipo',
            label: 'Tipo',
            type: 'single',
            required: true,
            choices: [
              { id: 'sem-gas', label: 'Sem gás', price: 0 },
              { id: 'com-gas', label: 'Com gás', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'refrigerante',
        category: 'Bebidas geladas',
        title: 'Refrigerante',
        description: 'Consulte a disponibilidade de sabores.',
        price: 'R$ 7',
      },
      {
        id: 'red-bull',
        category: 'Bebidas geladas',
        title: 'Red Bull',
        description: 'Consulte a disponibilidade de sabores.',
        price: 'R$ 13',
      },
      {
        id: 'suco',
        category: 'Bebidas geladas',
        title: 'Suco',
        description: 'Consulte a disponibilidade de sabores.',
        price: 'R$ 8',
      },

      // ---------- Bebidas quentes ----------
      {
        id: 'espresso',
        category: 'Bebidas quentes',
        title: 'Espresso',
        description: 'Dose de café espresso. Encorpado.',
        price: 'R$ 7',
      },
      {
        id: 'americano',
        category: 'Bebidas quentes',
        title: 'Americano',
        description: 'Dose de espresso com mais água. Suave.',
        price: 'R$ 8',
      },
      {
        id: 'cappuccino',
        category: 'Bebidas quentes',
        title: 'Cappuccino',
        description: 'Tradicional ou brasileiro.',
        price: 'R$ 14',
        options: [
          {
            id: 'estilo',
            label: 'Estilo',
            type: 'single',
            required: true,
            choices: [
              { id: 'tradicional', label: 'Tradicional', price: 0 },
              { id: 'brasileiro', label: 'Brasileiro', price: 0 },
            ],
          },
          milkOption,
        ],
      },
      {
        id: 'chocolate-quente',
        category: 'Bebidas quentes',
        title: 'Chocolate quente',
        description: 'Leite e chocolate cremoso.',
        price: 'R$ 14',
        options: [milkOption],
      },
      {
        id: 'choconana',
        category: 'Bebidas quentes',
        title: 'Choconana',
        description: 'Leite, chocolate e calda de banana.',
        price: 'R$ 14',
        options: [milkOption],
      },

      // ---------- Salgados ----------
      {
        id: 'coxinha',
        category: 'Salgados',
        title: 'Porção de coxinha (5 un.)',
        description: 'Crocante por fora, recheio cremoso por dentro.',
        price: 'R$ 18',
        image: coxinhas,
        featured: true,
      },
      {
        id: 'pao-de-queijo',
        category: 'Salgados',
        title: 'Pão de queijo (5 un.)',
        description: 'Quentinho, servido no copo da Nanica.',
        price: 'R$ 16',
        image: paoDeQueijo,
      },
      {
        id: 'waffle-pao-de-queijo',
        category: 'Salgados',
        title: 'Waffle de pão de queijo',
        description: 'Com topping de cream cheese.',
        price: 'R$ 14',
      },
      {
        id: 'folhado',
        category: 'Salgados',
        title: 'Folhado',
        description: 'Peito de peru com queijo branco.',
        price: 'R$ 14',
      },
    ],
  },

  order: {
    simulateLabel: 'Simular pedido',
    addToCartLabel: 'Adicionar ao pedido',
    cartLabel: 'Seu pedido',
    emptyCart: 'Seu pedido ainda está vazio. Escolha uma torta para começar.',
    checkoutLabel: 'Finalizar pedido',
    backToCartLabel: 'Voltar ao pedido',
    sendLabel: 'Enviar pedido pelo WhatsApp',
    quantityLabel: 'Quantidade',
    itemObservationLabel: 'Observação do item',
    paymentMethods: ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
    // O pedido pelo site é para retirada; entrega fica com iFood, 99Food ou WhatsApp.
    delivery: {
      title: 'Quer receber em casa?',
      text: 'O pedido pelo site é para retirar no balcão. Para entrega (das 10h às 22h), peça pelo iFood, pelo 99Food ou pelo WhatsApp.',
      links: [
        {
          label: 'Pedir entrega no WhatsApp',
          type: 'whatsapp',
          message: 'Olá, Nanica Taubaté! Quero fazer um pedido para entrega.',
        },
        {
          label: 'Pedir no iFood',
          type: 'ifood',
          href: 'https://www.ifood.com.br/delivery/taubate-sp/nanica---taubate-jardim-eulalia/97436b1a-9f02-488a-8a95-83a3dd688759',
        },
        {
          label: 'Pedir no 99Food',
          type: '99food',
          href: 'https://oia.99app.com/dlp9/UCpAYy',
        },
      ],
    },
    fields: [
      {
        id: 'name',
        key: 'name',
        label: 'Nome',
        required: true,
        tour: 'customer-name',
        placeholder: 'Como devemos te chamar',
        hint: 'Informe seu nome para a Nanica saber quem fez o pedido.',
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
        hint: 'Informe um telefone para confirmarmos o pedido.',
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
        placeholder: 'Ex.: torta inteira para sábado, horário de retirada',
        hint: 'Use este campo para encomendas e pedidos especiais.',
      },
    ],
  },

  gallery: {
    id: 'galeria',
    eyebrow: 'Galeria',
    title: 'A Nanica *em* camadas.',
    items: [
      {
        title: 'Bombonoffee, a novidade',
        image: bombonoffee,
        alt: 'Fatia de Bombonoffee com morangos e mousse de chocolate',
      },
      { title: 'Nosso salão', image: salao, alt: 'Salão da Nanica Taubaté com paredes amarelas e mesas pretas' },
      {
        title: 'Banoffee Junina',
        image: banoffeeJunina,
        alt: 'Tortas Banoffee com amendoim em mesa decorada para festa junina',
      },
      {
        title: 'Limonada da Copa',
        image: limonadaCopa,
        alt: 'Fatia verde e amarela da Limonada da Copa sobre fundo verde e laranja',
      },
      { title: 'Fondue de frutas', image: fondueUva, alt: 'Colher com uva e morango cobertos de chocolate' },
      {
        title: 'Pão de queijo quentinho',
        image: paoDeQueijoAberto,
        alt: 'Mãos abrindo um pão de queijo com o copo da Nanica ao fundo',
      },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: 'Por que a Nanica',
    title: 'Motivos *pra* voltar.',
    items: [
      { title: 'A melhor Banoffee do Brasil', description: 'Doce de leite, banana e chantilly: a receita que deu nome à casa.' },
      { title: 'Torta inteira pra festa', description: 'Média com 6 fatias ou Grande com 12, em qualquer um dos seis sabores.' },
      { title: 'Aberto todos os dias', description: 'Balcão das 8h às 22h; domingos e feriados até as 20h.' },
      { title: 'Delivery até as 22h', description: 'Pelo iFood, pelo 99Food ou direto no WhatsApp.' },
    ],
  },

  // Perfil da Nanica Taubaté no Google: nota geral e os temas que o Google destaca nas avaliações.
  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Avaliações no Google',
    title: 'Quem prova, *volta*.',
    rating: {
      value: '4,5',
      count: '141 avaliações no Google',
      source: 'Google',
      href: 'https://www.google.com/maps/search/?api=1&query=Nanica+Taubat%C3%A9+Av.+Juscelino+Kubitschek+de+Oliveira+15+Jardim+Eul%C3%A1lia',
      linkLabel: 'Ver avaliações no Google',
    },
    topics: {
      title: 'O que mais aparece nas avaliações',
      items: [
        { label: 'Torta', count: 27 },
        { label: 'Banoffee', count: 10 },
        { label: 'Ambiente agradável', count: 9 },
        { label: 'Torta de morango', count: 2 },
      ],
      note: 'Temas destacados pelo Google nas avaliações da Nanica Taubaté.',
    },
    items: [],
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Passe *aqui* ou chame no WhatsApp.',
    description: 'Estamos na Av. Juscelino Kubitschek, no Jardim Eulália. Para encomendas de tortas inteiras, fale com a gente pelo WhatsApp.',
    form: {
      nameLabel: 'Nome',
      phoneLabel: 'WhatsApp',
      messageLabel: 'Mensagem',
      submitLabel: 'Enviar pelo WhatsApp',
      consent: 'Autorizo o contato pelo WhatsApp.',
    },
  },
};

export default content;
