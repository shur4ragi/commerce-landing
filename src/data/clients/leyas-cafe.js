import cappuccino from '../../assets/images/leyas/cappuccino.jpg';
import chocolateQuente from '../../assets/images/leyas/chocolate-quente.jpg';
import frappuccino from '../../assets/images/leyas/frappuccino.jpg';
import tortaFrango from '../../assets/images/leyas/torta-frango.jpg';
import paoQueijoFolhado from '../../assets/images/leyas/pao-queijo-folhado.jpg';
import croqueMadame from '../../assets/images/leyas/croque-madame.jpg';
import toastParma from '../../assets/images/leyas/toast-parma.jpg';
import toastCaprese from '../../assets/images/leyas/toast-caprese.jpg';
import cookieNutella from '../../assets/images/leyas/cookie-nutella.jpg';
import matildaCake from '../../assets/images/leyas/matilda-cake.jpg';
import copoFelicidade from '../../assets/images/leyas/copo-felicidade.jpg';
import acai from '../../assets/images/leyas/acai.jpg';
import acaiTigela from '../../assets/images/leyas/acai-tigela.jpg';
import croissantNutella from '../../assets/images/leyas/croissant-nutella.jpg';
import bagueteSalame from '../../assets/images/leyas/baguete-salame.jpg';
import bombomMorango from '../../assets/images/leyas/bombom-morango.jpg';
import cookiesBalcao from '../../assets/images/leyas/cookies-nutella-balcao.jpg';
import croqueMesa from '../../assets/images/leyas/croque-madame-mesa.jpg';
import fachada from '../../assets/images/leyas/fachada.jpg';
import mural from '../../assets/images/leyas/mural.jpg';

// Conteúdo baseado no Instagram @leyascaffe e no cardápio oficial (PDF do Google Drive).
const content = {
  intro: {
    brand: "Leya's Café",
    eyebrow: "Leya's Café · Taubaté",
    cta: { label: 'Conhecer', target: '#inicio' },
    slides: [
      {
        image: matildaCake,
        alt: 'Fatia de Matilda Cake com calda de chocolate servida à parte',
        title: 'Matilda *Cake*',
        text: 'Chocolate intenso, brigadeiro em camadas e calda de chocolate. A estrela da casa.',
      },
      {
        image: frappuccino,
        alt: "Frappuccino da casa no copo do Leya's com chantilly",
        title: 'Frappuccino *da* casa',
        text: 'Sorvete, dose de expresso e o chantilly especial da casa, batidos na hora.',
      },
      {
        image: croqueMadame,
        alt: 'Croque-madame gratinado com ovo e tomate sobre prato',
        title: 'Croque-*madame*',
        text: 'Brioche com presunto, queijo gratinado, molho bechamel e ovo por cima.',
      },
      {
        image: chocolateQuente,
        alt: 'Chocolate quente com marshmallow tostado em xícara de vidro',
        title: 'Chocolate *com* marshmallow',
        text: 'Chocolate quente cremoso coberto por marshmallow tostado na hora.',
      },
      {
        image: cookieNutella,
        alt: 'Cookies recheados ao lado de um pote de Nutella',
        title: 'Cookie *Nutella*',
        text: 'O queridinho da casa, recheado e servido quentinho.',
      },
      {
        image: toastParma,
        alt: 'Toast de pão artesanal com presunto parma e creme de ricota',
        title: 'Toast *Parma*',
        text: 'Pão artesanal, presunto parma, creme de ricota e molho balsâmico.',
      },
      {
        image: croissantNutella,
        alt: 'Croissant recheado com Nutella e morangos',
        title: 'Croissant *com* morango',
        text: 'Massa folhada, Nutella original e morangos frescos.',
      },
      {
        image: acai,
        alt: 'Tigela de açaí com granola, banana e morango',
        title: 'Açaí *na* tigela',
        text: 'Açaí puro e cremoso, batido na hora, com os adicionais que você escolher.',
      },
    ],
  },

  hero: {
    eyebrow: 'Independência · Taubaté',
    title: 'Seu lugar favorito em Taubaté.',
    highlight: 'favorito em Taubaté.',
    description:
      "Café, doces e salgados da casa num cantinho feito para ficar. Do cappuccino da tarde ao Matilda Cake que virou assinatura, o Leya's é aquele café que você indica para os amigos.",
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Como chegar', href: '#contato', action: 'map' },
    tutorialCta: { label: 'Simular pedido' },
    image: cappuccino,
    imageAlt: "Cappuccino com arte no leite em frente ao letreiro do Leya's",
    metrics: [
      { value: '9,9 mil', label: 'Seguidores no Instagram' },
      { value: '8h', label: 'Café da manhã sáb. e dom.' },
      { value: '6 dias', label: 'Abertos na semana' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'A casa',
    title: 'Um café para *ficar*.',
    text: "O Leya's nasceu para ser o seu lugar favorito em Taubaté: mesa boa, café bem tirado e uma vitrine que faz a gente mudar de ideia na hora de pedir. Os salgados saem do forno todos os dias, a massa folhada é artesanal e os bolos em camadas viraram assunto no Instagram.",
    image: croqueMesa,
    imageAlt: "Croque-madame servido no salão do Leya's Café",
    facts: [
      { value: 'Matilda Cake', label: 'A estrela da casa' },
      { value: 'Forno diário', label: 'Salgados e tortas da casa' },
      { value: 'Sáb. e dom.', label: 'Café da manhã desde as 8h' },
    ],
  },

  statement: {
    id: 'manifesto',
    eyebrow: 'Receitas da casa',
    title: 'Feito *com*\ncarinho.',
    // Fotos das colunas em cascata ao fundo (decorativas).
    images: [
      matildaCake,
      frappuccino,
      croqueMadame,
      cookieNutella,
      tortaFrango,
      chocolateQuente,
      toastParma,
      acaiTigela,
      paoQueijoFolhado,
      copoFelicidade,
      croissantNutella,
      toastCaprese,
      bombomMorango,
      bagueteSalame,
      cappuccino,
      cookiesBalcao,
    ],
    lead: 'Do salgado que sai do forno pela manhã ao bolo que fecha a tarde.',
    text: 'Torta de frango assada diariamente, massa folhada artesanal, brioche na chapa e bolos em camadas com calda generosa. Cada prato é pensado para combinar com o café, e para aparecer bonito na foto também.',
    // Cobertura na cor da casa escorrendo no hover.
    cta: { label: 'Ver o cardápio', href: '#produtos', style: 'cover' },
  },

  process: {
    id: 'processo',
    label: 'Do forno ao story',
    steps: [
      {
        lead: 'do',
        word: 'forno,',
        title: 'Forno',
        text: 'Salgados e tortas com receita da casa, assados todos os dias.',
        image: tortaFrango,
        alt: 'Fatia de torta de frango com um café ao fundo',
      },
      {
        lead: 'à',
        word: 'mesa,',
        title: 'Mesa',
        text: 'Servido na hora: croque gratinado, ovos cremosos e chocolate com marshmallow tostado.',
        image: croqueMadame,
        alt: 'Croque-madame gratinado servido no prato',
      },
      {
        lead: 'ao',
        word: 'story.',
        title: 'Story',
        text: 'Matilda Cake com calda extra: difícil não fotografar antes da primeira garfada.',
        image: matildaCake,
        alt: 'Matilda Cake com calda de chocolate',
      },
    ],
  },

  services: {
    id: 'servicos',
    eyebrow: 'Experiências',
    title: 'Um Leya’s *para* cada hora.',
    description: 'Do café da manhã de fim de semana ao doce do fim da tarde.',
    items: [
      {
        title: 'Café da manhã',
        description: 'Sábados e domingos a partir das 8h: brioche na chapa, ovos mexidos e croque.',
        image: croqueMadame,
      },
      {
        title: 'Bolos e doces',
        description: 'Matilda Cake, Red Velvet, cookies recheados e o Copo da Felicidade.',
        image: matildaCake,
      },
      {
        title: 'Gelados e frappuccinos',
        description: 'Frappuccinos da casa, sodas italianas, sucos e açaí na tigela.',
        image: frappuccino,
      },
      {
        title: 'Salgados da casa',
        description: 'Torta de frango, quiches, coxinhas com Catupiry e pão de queijo folhado.',
        image: tortaFrango,
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'O que tem *no* Leya’s hoje.',
    description: 'Cardápio completo em "Ver todos". Preços e disponibilidade podem mudar; confirme no balcão.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    orderLabel: 'Pedir no WhatsApp',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um item e toque em salvar para guardar.',
    items: [
      // ---------- Cafés e bebidas quentes ----------
      {
        id: 'espresso',
        category: 'Cafés e bebidas quentes',
        title: 'Espresso',
        description: 'Café intenso e aromático, servido em dose curta.',
        price: 'R$ 9',
      },
      {
        id: 'especial-baggio',
        category: 'Cafés e bebidas quentes',
        title: 'Especial Baggio',
        description: 'Café aromatizado Baggio.',
        details: 'Aromas: caramelo, bourbon, chocolate trufado, chocolate com avelã e baunilha.',
        price: 'R$ 12',
        options: [
          {
            id: 'aroma',
            label: 'Aroma',
            type: 'single',
            required: true,
            choices: [
              { id: 'caramelo', label: 'Caramelo', price: 0 },
              { id: 'bourbon', label: 'Bourbon', price: 0 },
              { id: 'chocolate-trufado', label: 'Chocolate trufado', price: 0 },
              { id: 'chocolate-avela', label: 'Chocolate com avelã', price: 0 },
              { id: 'baunilha', label: 'Baunilha', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'cafe-coado',
        category: 'Cafés e bebidas quentes',
        title: 'Café coado',
        description: 'Tradicional da máquina.',
        price: 'R$ 10,90',
      },
      {
        id: 'cappuccino',
        category: 'Cafés e bebidas quentes',
        title: 'Cappuccino',
        description: 'Café, leite e chocolate.',
        price: 'R$ 10,90',
        image: cappuccino,
        featured: true,
      },
      {
        id: 'cappuccino-avela',
        category: 'Cafés e bebidas quentes',
        title: 'Cappuccino avelã',
        description: 'Leite, chocolate, avelã e café.',
        price: 'R$ 10,90',
      },
      {
        id: 'cafe-com-leite',
        category: 'Cafés e bebidas quentes',
        title: 'Café com leite',
        description: 'Expresso com leite.',
        price: 'R$ 10,90',
      },
      {
        id: 'chocolate-quente',
        category: 'Cafés e bebidas quentes',
        title: 'Chocolate quente',
        description: 'Chocolate quente tradicional.',
        price: 'R$ 10,90',
      },
      {
        id: 'chocolate-marshmallow',
        category: 'Cafés e bebidas quentes',
        title: 'Chocolate quente cremoso com marshmallow',
        description: 'Chocolate quente cremoso coberto com marshmallow tostado.',
        price: 'R$ 18,90',
        image: chocolateQuente,
        featured: true,
      },
      {
        id: 'mocaccino',
        category: 'Cafés e bebidas quentes',
        title: 'Mocaccino',
        description: 'Dose de café expresso com chocolate quente.',
        price: 'R$ 10,90',
      },

      // ---------- Frappuccinos ----------
      {
        id: 'frappuccino-casa',
        category: 'Frappuccinos',
        title: 'Frappuccino da casa',
        description: 'Sorvete, dose de expresso e chantilly especial da casa.',
        price: 'R$ 19',
        image: frappuccino,
        featured: true,
      },
      {
        id: 'frappuccino-nutella',
        category: 'Frappuccinos',
        title: 'Frappuccino Nutella',
        description: 'A versão da casa com Nutella.',
        price: 'R$ 23',
      },
      {
        id: 'frappuccino-doce-leite',
        category: 'Frappuccinos',
        title: 'Frappuccino doce de leite',
        description: 'A versão da casa com doce de leite.',
        price: 'R$ 23',
      },
      {
        id: 'cappuccino-gelado',
        category: 'Frappuccinos',
        title: 'Cappuccino gelado',
        description: 'Cappuccino batido e servido gelado.',
        price: 'R$ 19',
      },

      // ---------- Gelados e refrescantes ----------
      {
        id: 'cha-gelado',
        category: 'Gelados e refrescantes',
        title: 'Chá gelado',
        description: 'Copo de 300ml.',
        price: 'R$ 12',
      },
      {
        id: 'ovomaltine-gelado',
        category: 'Gelados e refrescantes',
        title: 'Ovomaltine gelado',
        description: 'Ovomaltine batido com leite gelado.',
        price: 'R$ 14',
      },
      {
        id: 'suco-polpa',
        category: 'Gelados e refrescantes',
        title: 'Suco de polpa',
        description: 'Consulte os sabores do dia.',
        price: 'R$ 14',
      },
      {
        id: 'suco-natural',
        category: 'Gelados e refrescantes',
        title: 'Suco natural',
        description: 'Consulte os sabores do dia.',
        price: 'R$ 14',
      },
      {
        id: 'suco-laramora',
        category: 'Gelados e refrescantes',
        title: 'Suco Laramora ou Maramora',
        description: 'Laranja com morango ou maracujá com morango.',
        price: 'R$ 18',
        options: [
          {
            id: 'sabor',
            label: 'Sabor',
            type: 'single',
            required: true,
            choices: [
              { id: 'laramora', label: 'Laramora (laranja com morango)', price: 0 },
              { id: 'maramora', label: 'Maramora (maracujá com morango)', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'soda-italiana',
        category: 'Gelados e refrescantes',
        title: 'Soda italiana',
        description: 'Refrescante e gaseificada.',
        price: 'R$ 14',
      },
      {
        id: 'agua-com-gas',
        category: 'Gelados e refrescantes',
        title: 'Água com gás',
        description: 'Garrafa individual.',
        price: 'R$ 7',
      },
      {
        id: 'agua-sem-gas',
        category: 'Gelados e refrescantes',
        title: 'Água sem gás',
        description: 'Garrafa individual.',
        price: 'R$ 6',
      },
      {
        id: 'refrigerante',
        category: 'Gelados e refrescantes',
        title: 'Refrigerante',
        description: 'Consulte os sabores.',
        price: 'R$ 7,90',
      },
      {
        id: 'coca-ks',
        category: 'Gelados e refrescantes',
        title: 'Coca KS',
        description: 'Coca-Cola KS.',
        price: 'R$ 7',
      },

      // ---------- Salgados ----------
      {
        id: 'coxinhas-catupiry',
        category: 'Salgados',
        title: 'Coxinhas com Catupiry original (3 un.)',
        description: 'Crocantes por fora, cremosas por dentro.',
        price: 'R$ 15',
      },
      {
        id: 'torta-frango',
        category: 'Salgados',
        title: 'Torta de frango',
        description: 'Receita da casa, assada diariamente.',
        price: 'R$ 22',
        image: tortaFrango,
        featured: true,
      },
      {
        id: 'croissant-peru',
        category: 'Salgados',
        title: 'Croissant peito de peru e cream cheese',
        description: 'Massa folhada artesanal com recheio generoso.',
        price: 'R$ 22',
      },
      {
        id: 'quiche-brocolis-bacon',
        category: 'Salgados',
        title: 'Quiche de brócolis com bacon',
        description: 'Equilíbrio entre o defumado e o fresco.',
        price: 'R$ 15',
      },
      {
        id: 'quiche-alho-poro',
        category: 'Salgados',
        title: 'Quiche de alho-poró',
        description: 'Delicada e aromática.',
        price: 'R$ 15',
      },
      {
        id: 'pao-queijo-folhado',
        category: 'Salgados',
        title: 'Pão de queijo folhado com requeijão',
        description: 'Folhado, quentinho e com requeijão cremoso.',
        price: 'R$ 14',
        image: paoQueijoFolhado,
        featured: true,
      },

      // ---------- No brioche ----------
      {
        id: 'brioche-chapa',
        category: 'No brioche',
        title: 'Pão brioche na chapa',
        description: 'Uma fatia de brioche dourada na chapa.',
        price: 'R$ 10',
      },
      {
        id: 'brioche-duas-fatias',
        category: 'No brioche',
        title: '2 fatias de pão brioche',
        description: 'Com requeijão, manteiga, Nutella ou doce de leite.',
        price: 'R$ 16',
        options: [
          {
            id: 'cobertura',
            label: 'Escolha',
            type: 'single',
            required: true,
            choices: [
              { id: 'requeijao', label: 'Requeijão', price: 0 },
              { id: 'manteiga', label: 'Manteiga', price: 0 },
              { id: 'nutella', label: 'Nutella', price: 0 },
              { id: 'doce-de-leite', label: 'Doce de leite', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'misto-brioche',
        category: 'No brioche',
        title: 'Misto quente no brioche',
        description: 'Queijo, presunto e requeijão.',
        price: 'R$ 15',
      },
      {
        id: 'ovos-mexidos-brioche',
        category: 'No brioche',
        title: 'Ovos mexidos com pão brioche',
        description: 'Cremosos, no ponto perfeito.',
        price: 'R$ 19',
      },
      {
        id: 'croque-monsieur',
        category: 'No brioche',
        title: 'Croque-monsieur',
        description: 'Pão brioche com presunto, queijo gratinado e molho bechamel.',
        price: 'R$ 25',
      },
      {
        id: 'croque-madame',
        category: 'No brioche',
        title: 'Croque-madame',
        description: 'A versão incrementada do croque-monsieur, com ovo.',
        price: 'R$ 28',
        image: croqueMadame,
        featured: true,
      },

      // ---------- Toasts ----------
      {
        id: 'toast-parma',
        category: 'Toasts',
        title: 'Toast Parma',
        description: 'Pão artesanal com presunto parma, creme de ricota e molho balsâmico.',
        price: 'R$ 24,90',
        image: toastParma,
        featured: true,
      },
      {
        id: 'toast-caprese',
        category: 'Toasts',
        title: 'Toast Caprese',
        description: 'Pão artesanal, muçarela de búfala, pesto de manjericão e tomate-cereja confitado.',
        price: 'R$ 24,90',
        image: toastCaprese,
      },

      // ---------- Bolos ----------
      {
        id: 'matilda-cake',
        category: 'Bolos',
        title: 'Matilda Cake',
        description: 'Bolo de chocolate intenso com brigadeiro em camadas e calda de chocolate.',
        price: 'R$ 25,90',
        image: matildaCake,
        featured: true,
      },
      {
        id: 'leyas-cake',
        category: 'Bolos',
        title: "Leya's Cake (Kinder Bueno)",
        description: 'Chocolate intenso com brigadeiro de Kinder Bueno, calda Kinder branca e pedaços de Kinder Bueno.',
        price: 'R$ 29,90',
      },
      {
        id: 'red-velvet',
        category: 'Bolos',
        title: 'Red Velvet Cake',
        description: 'Receita original inglesa com recheio à base de cream cheese.',
        price: 'R$ 22,90',
      },

      // ---------- Doces ----------
      {
        id: 'cookie-nutella',
        category: 'Doces',
        title: 'Cookie Nutella',
        description: 'O queridinho da casa.',
        price: 'R$ 15',
        image: cookieNutella,
        featured: true,
      },
      {
        id: 'cookie-kinder',
        category: 'Doces',
        title: 'Cookie Kinder',
        description: 'Recheado com Nutella e coberto com Kinder.',
        price: 'R$ 18',
      },
      {
        id: 'cookie-dark',
        category: 'Doces',
        title: 'Cookie Dark',
        description: 'Para os amantes de chocolate.',
        price: 'R$ 15',
      },
      {
        id: 'cookie-dark-alpino',
        category: 'Doces',
        title: 'Cookie Dark Alpino',
        description: 'Cookie de chocolate com Alpino.',
        price: 'R$ 18',
      },
      {
        id: 'brownie-sorvete',
        category: 'Doces',
        title: 'Brownie com sorvete de creme',
        description: 'A combinação que nunca falha.',
        price: 'R$ 25',
      },
      {
        id: 'brownie-casquinha',
        category: 'Doces',
        title: 'Brownie com casquinha',
        description: 'Adicione brigadeiro e morango por + R$ 5.',
        price: 'R$ 16',
        options: [
          {
            id: 'extra',
            label: 'Adicional',
            type: 'multi',
            choices: [{ id: 'brigadeiro-morango', label: 'Brigadeiro e morango', price: 5 }],
          },
        ],
      },
      {
        id: 'cuca-maca',
        category: 'Doces',
        title: 'Cuca de maçã (ou apple pie)',
        description: 'Sugestão da casa: adicione sorvete de creme por + R$ 5.',
        price: 'R$ 15',
        options: [
          {
            id: 'extra',
            label: 'Adicional',
            type: 'multi',
            choices: [{ id: 'sorvete', label: 'Sorvete de creme', price: 5 }],
          },
        ],
      },
      {
        id: 'croissant-nutella-morango',
        category: 'Doces',
        title: 'Croissant Nutella com morango',
        description: 'Massa folhada com Nutella original e morango.',
        price: 'R$ 22',
        image: croissantNutella,
        featured: true,
      },
      {
        id: 'copo-felicidade',
        category: 'Doces',
        title: 'Copo da Felicidade',
        description: 'Brownie, Nutella e mousse de maracujá.',
        price: 'R$ 24',
        image: copoFelicidade,
        featured: true,
      },

      // ---------- Açaí ----------
      {
        id: 'acai-tigela',
        category: 'Açaí',
        title: 'Açaí na tigela 300g',
        description: 'Açaí puro e cremoso, batido na hora.',
        details: 'Adicionais a R$ 3 cada.',
        price: 'R$ 18,90',
        image: acai,
        featured: true,
        options: [
          {
            id: 'adicionais',
            label: 'Adicionais (R$ 3 cada)',
            type: 'multi',
            choices: [
              { id: 'granola', label: 'Granola', price: 3 },
              { id: 'banana', label: 'Banana', price: 3 },
              { id: 'confete', label: 'Confete', price: 3 },
              { id: 'leite-em-po', label: 'Leite em pó', price: 3 },
              { id: 'morango', label: 'Morango', price: 3 },
              { id: 'chocobol', label: 'Chocobol', price: 3 },
              { id: 'leite-condensado', label: 'Leite condensado', price: 3 },
            ],
          },
        ],
      },
    ],
  },

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
          message: "Olá, Leya's Café! Quero fazer um pedido para entrega.",
        },
        {
          label: 'Pedir no iFood',
          type: 'ifood',
          href: 'https://www.ifood.com.br/delivery/taubate-sp/leyas-cafe-independencia/ee56c6aa-e6cc-4e8d-b801-abcf4e860466',
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
        hint: "Informe seu nome para o Leya's saber quem fez o pedido.",
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
        placeholder: 'Ex.: sem açúcar, calda extra no Matilda, horário de retirada',
        hint: 'Use este campo para pedidos especiais.',
      },
    ],
  },

  gallery: {
    id: 'galeria',
    eyebrow: 'Galeria',
    title: 'O Leya’s *no* dia a dia.',
    items: [
      { title: 'Cookies da casa', image: cookieNutella, alt: 'Cookies recheados ao lado de um pote de Nutella' },
      {
        title: 'Nossa fachada',
        image: fachada,
        alt: "Fachada do Leya's Café no Independência, em Taubaté",
        position: 'center 72%',
      },
      { title: 'Cantinho das memórias', image: mural, alt: 'Mural com fotos e bilhetes de clientes no salão' },
      { title: 'Açaí na tigela', image: acaiTigela, alt: 'Tigela de açaí com granola, banana e morango vista de cima' },
      { title: 'Bombons de morango', image: bombomMorango, alt: 'Morangos cobertos com chocolate branco em prato escuro' },
      { title: 'Baguete da casa', image: bagueteSalame, alt: 'Baguete aberta com frios, tomate e muçarela' },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: "Por que o Leya's",
    title: 'Motivos *para* voltar.',
    items: [
      { title: 'Receitas da casa', description: 'Torta de frango, quiches e salgados assados todos os dias.' },
      { title: 'Massa folhada artesanal', description: 'Croissants e folhados feitos na casa, com recheio generoso.' },
      { title: 'Bolos que viraram assinatura', description: "Matilda Cake, Leya's Cake de Kinder Bueno e Red Velvet." },
      { title: 'Café da manhã no fim de semana', description: 'Sábados e domingos, a partir das 8h.' },
    ],
  },

  // Avaliações reais do perfil do Leya's no Google (nota geral e comentários exibidos pelo Google).
  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Avaliações no Google',
    title: 'Quem vem, *volta*.',
    rating: {
      value: '5,0',
      count: '51 avaliações no Google',
      source: 'Google',
      href: "https://www.google.com/maps/place/Leya's+Caf%C3%A9/@-23.0376963,-45.5947859,17z/data=!4m6!3m5!1s0x94ccf9aff38326e1:0x6bd4d21543e69a86!8m2!3d-23.0376963!4d-45.5947859!16s%2Fg%2F11nb9_l56q",
      linkLabel: 'Ver avaliações no Google',
    },
    items: [
      {
        quote: 'O ambiente é gostoso, a moça que atendeu a gente super SUPER simpática.',
        stars: 5,
      },
      {
        quote: 'Foi a primeira vez que fui e a primeira vez que o clube do livro foi lá!',
        stars: 5,
      },
    ],
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Passe *aqui* ou chame no WhatsApp.',
    description: 'Estamos no Independência, em Taubaté. Para encomendas e pedidos, fale com a gente pelo WhatsApp.',
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
