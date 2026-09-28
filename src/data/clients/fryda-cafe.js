import empadao from '../../assets/images/fryda/empadao.jpg';
import boloChocolate from '../../assets/images/fryda/bolo-chocolate.jpg';
import redVelvet from '../../assets/images/fryda/red-velvet.jpg';
import bruschetta from '../../assets/images/fryda/bruschetta.jpg';
import cappuccino from '../../assets/images/fryda/cappuccino.jpg';
import salao from '../../assets/images/fryda/salao.jpg';
import clientePao from '../../assets/images/fryda/cliente-pao-de-queijo.jpg';
import fridaIlustracao from '../../assets/images/fryda/frida-ilustracao.jpg';
import lema from '../../assets/images/fryda/lema.jpg';

// Conteúdo baseado no Instagram @frydacafe, no perfil do Google e em avaliações públicas.
// Sem preços: o cardápio completo com valores está no iFood (modo vitrine, features.ordering: false).
const content = {
  intro: {
    brand: 'Fryda Café',
    eyebrow: 'Fryda Café · Taubaté',
    cta: { label: 'Conhecer', target: '#inicio' },
    slides: [
      {
        image: empadao,
        alt: 'Fatia de empadão com recheio cremoso e massa dourada',
        title: 'Empadão *da* Tia Branca',
        text: 'A receita de família que virou um dos pedidos mais queridos da casa.',
      },
      {
        image: cappuccino,
        alt: 'Cappuccino servido na xícara com o logo do Fryda Café',
        title: 'Cappuccino *na* xícara da casa',
        text: 'Espresso, cappuccino, latte e flat white para acompanhar a vitrine.',
      },
      {
        image: boloChocolate,
        alt: 'Fatia de bolo de chocolate em camadas com cobertura escorrendo',
        title: 'Bolo *de* chocolate',
        text: 'Camadas de chocolate e cobertura generosa, do jeito que a gente gosta.',
      },
      {
        image: salao,
        alt: 'Salão do Fryda Café com cadeiras vermelhas e quadros da Frida Kahlo',
        title: 'Um café *com* personalidade',
        text: 'Cadeiras vermelhas, quadros da Frida e aquele cheiro de café passado.',
      },
      {
        image: redVelvet,
        alt: 'Fatia de red velvet com recheio branco',
        title: 'Red *velvet*',
        text: 'Massa vermelha aveludada e recheio cremoso em camadas.',
      },
      {
        image: bruschetta,
        alt: 'Bruschetta com creme, tomates e folhas de manjericão',
        title: 'Coisas *que* a gente acha chique',
        text: 'Bruschetta com creme, tomatinhos e manjericão fresco.',
      },
      {
        image: fridaIlustracao,
        alt: 'Ilustração da Frida Kahlo tomando café sentada numa cadeira',
        title: 'A casa *da* Fryda',
        text: 'Um café inspirado na Frida Kahlo, no Centro de Taubaté.',
      },
      {
        image: clientePao,
        alt: 'Cliente tomando café ao lado da parede com a Frida',
        title: 'Seu café *da* tarde',
        text: 'Um café, um salgado quentinho e uma pausa no meio do dia.',
      },
    ],
  },

  hero: {
    eyebrow: 'Centro · Taubaté',
    title: 'Não vamos te vender algo que a gente não comeria.',
    highlight: 'que a gente não comeria.',
    description:
      'Cafés, salgados e doces num café inspirado na Frida Kahlo, no Centro de Taubaté. Venha tomar um café com a gente, peça pelo iFood ou encomende pelo WhatsApp.',
    primaryCta: { label: 'Ver cardápio', href: '#produtos' },
    secondaryCta: { label: 'Como chegar', href: '#contato' },
    image: empadao,
    imageAlt: 'Fatia do empadão da Tia Branca com massa dourada',
    metrics: [
      { value: '11 mil', label: 'Seguidores no Instagram' },
      { value: '4,6', label: 'Nota no Google' },
      { value: '9h', label: 'Abre de segunda a sábado' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'A casa',
    title: 'Um café *com* alma de Frida.',
    text: 'O Fryda Café fica no Centro de Taubaté e carrega a Frida Kahlo nas paredes, nas cores e na xícara. Cadeiras vermelhas, quadros da artista e uma vitrine com receitas que a própria equipe come e recomenda: por aqui, a regra é não vender nada que a gente não comeria.',
    image: salao,
    imageAlt: 'Salão do Fryda Café com cadeiras vermelhas e quadros da Frida Kahlo',
    facts: [
      { value: 'Empadão', label: 'Receita da Tia Branca' },
      { value: 'Encomendas', label: 'Pelo WhatsApp' },
      { value: 'Delivery', label: 'Pelo iFood' },
    ],
  },

  statement: {
    id: 'manifesto',
    eyebrow: 'Nosso lema',
    title: 'Feito *para*\ncomer junto.',
    // Fotos das colunas em cascata ao fundo (decorativas).
    images: [empadao, cappuccino, boloChocolate, salao, redVelvet, bruschetta, fridaIlustracao, clientePao, lema],
    lead: 'Não vamos te vender algo que a gente não comeria.',
    text: 'Empadão da Tia Branca, waffle de queijo com requeijão, pão de batata recheado e bolos em camadas dividem a vitrine com espresso, cappuccino, latte e flat white.',
    cta: { label: 'Ver o cardápio', href: '#produtos' },
  },

  services: {
    id: 'servicos',
    eyebrow: 'Experiências',
    title: 'Do café *ao* delivery.',
    description: 'Para tomar no salão, pedir em casa ou encomendar para a sua festa.',
    items: [
      {
        title: 'Café e vitrine',
        description: 'Espresso, cappuccino, latte e flat white com salgados e doces da casa.',
        image: cappuccino,
      },
      {
        title: 'Salgados da casa',
        description: 'Empadão da Tia Branca, quiche de alho-poró e pão de batata recheado.',
        image: empadao,
      },
      {
        title: 'Bolos e doces',
        description: 'Bolo de chocolate, red velvet, brownie e tiramisù.',
        image: boloChocolate,
      },
      {
        title: 'Encomendas',
        description: 'Bolos e salgados sob encomenda, combinados pelo WhatsApp.',
        image: redVelvet,
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'O que tem *na* vitrine.',
    description: 'Alguns queridinhos da casa. O cardápio completo, com preços, está no iFood.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um item e toque em salvar para guardar.',
    items: [
      // ---------- Cafés ----------
      {
        id: 'cappuccino',
        category: 'Cafés',
        title: 'Cappuccino',
        description: 'Servido na xícara da casa.',
        image: cappuccino,
        featured: true,
      },
      {
        id: 'espresso',
        category: 'Cafés',
        title: 'Espresso italiano ou carioca',
        description: 'Curto e intenso, ou na versão carioca, mais suave.',
      },
      {
        id: 'macchiato',
        category: 'Cafés',
        title: 'Espresso macchiato',
        description: 'Espresso com uma camada de espuma de leite.',
      },
      {
        id: 'latte',
        category: 'Cafés',
        title: 'Latte',
        description: 'Espresso com bastante leite vaporizado.',
      },
      {
        id: 'flat-white',
        category: 'Cafés',
        title: 'Flat white',
        description: 'Espresso com leite vaporizado e pouca espuma.',
      },
      {
        id: 'chas',
        category: 'Cafés',
        title: 'Chás',
        description: 'Consulte as opções do dia.',
      },

      // ---------- Salgados ----------
      {
        id: 'empadao-tia-branca',
        category: 'Salgados',
        title: 'Empadão da Tia Branca',
        description: 'Receita de família e um dos pedidos mais queridos da casa.',
        image: empadao,
        featured: true,
      },
      {
        id: 'bruschetta',
        category: 'Salgados',
        title: 'Bruschetta',
        description: 'Pão tostado com creme, tomatinhos e manjericão fresco.',
        image: bruschetta,
        featured: true,
      },
      {
        id: 'waffle-queijo',
        category: 'Salgados',
        title: 'Waffle de queijo com requeijão',
        description: 'Crocante por fora, com requeijão cremoso.',
      },
      {
        id: 'pao-batata',
        category: 'Salgados',
        title: 'Pão de batata recheado',
        description: 'Com recheios como Catupiry e alho-poró.',
      },
      {
        id: 'quiche-alho-poro',
        category: 'Salgados',
        title: 'Quiche de alho-poró',
        description: 'Massa amanteigada com recheio cremoso.',
      },
      {
        id: 'sanduiche-pernil',
        category: 'Salgados',
        title: 'Sanduíche de pernil desfiado',
        description: 'Pernil desfiado no pão.',
      },
      {
        id: 'opcoes-veganas',
        category: 'Salgados',
        title: 'Opções veganas',
        description: 'Pergunte pelas opções veganas do dia.',
      },

      // ---------- Doces ----------
      {
        id: 'bolo-chocolate',
        category: 'Doces',
        title: 'Bolo de chocolate',
        description: 'Camadas de chocolate com cobertura generosa.',
        image: boloChocolate,
        featured: true,
      },
      {
        id: 'red-velvet',
        category: 'Doces',
        title: 'Red velvet',
        description: 'Massa vermelha aveludada com recheio cremoso.',
        image: redVelvet,
        featured: true,
      },
      {
        id: 'brownie',
        category: 'Doces',
        title: 'Brownie',
        description: 'Chocolate intenso, casquinha crocante.',
      },
      {
        id: 'tiramisu',
        category: 'Doces',
        title: 'Tiramisù',
        description: 'Camadas de café, creme e cacau.',
      },
      {
        id: 'torta-nutella',
        category: 'Doces',
        title: 'Torta de Nutella',
        description: 'Para quem não abre mão de Nutella.',
      },
    ],
  },

  // Vitrine: cada item leva ao iFood (com preços) ou ao WhatsApp para encomendas.
  order: {
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
      { title: 'Café da tarde', image: clientePao, alt: 'Cliente tomando café ao lado da parede com a Frida' },
      { title: 'Bruschetta', image: bruschetta, alt: 'Bruschetta com creme, tomates e manjericão' },
      { title: 'Red velvet', image: redVelvet, alt: 'Fatia de red velvet' },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: 'Por que o Fryda',
    title: 'Motivos *para* voltar.',
    items: [
      { title: 'Empadão da Tia Branca', description: 'O salgado que virou marca registrada da casa.' },
      { title: 'Um café com a Frida', description: 'Quadros, cores e cadeiras vermelhas: um café com personalidade.' },
      { title: 'Delivery pelo iFood', description: 'Seus favoritos em casa, direto pelo app.' },
      { title: 'Encomendas', description: 'Bolos e salgados para a sua festa, combinados pelo WhatsApp.' },
    ],
  },

  // Avaliações reais do Google (nota geral e comentários públicos).
  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Avaliações no Google',
    title: 'Quem vem, *volta*.',
    rating: {
      value: '4,6',
      count: 'Mais de 360 avaliações no Google',
      source: 'Google',
      href: 'https://www.google.com/maps/search/?api=1&query=Fryda%20Caf%C3%A9%20R.%20Dr.%20Pedro%20Costa%20531%20Taubat%C3%A9',
      linkLabel: 'Ver avaliações no Google',
    },
    items: [
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
    ],
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Passe *aqui* ou peça pelo iFood.',
    description: 'Estamos na Rua Dr. Pedro Costa, no Centro de Taubaté. Encomendas pelo WhatsApp e delivery pelo iFood.',
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
