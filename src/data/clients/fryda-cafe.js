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

// Conteúdo baseado no Instagram @frydacafe (feed e destaques "Nossas Delícias", "Encomendas",
// "Delivery", "Estacionamento" e "Nasce um sonho"), no perfil do Google e em avaliações públicas.
// Sem preços: o cardápio com valores está no iFood (modo vitrine, features.ordering: false).
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
    cta: { label: 'Ver o cardápio', href: '#produtos' },
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
    description: 'A vitrine muda ao longo da semana. O cardápio completo, com preços, está no iFood.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um item e toque em salvar para guardar.',
    items: [
      // ---------- Cafés ----------
      { id: 'cafe-coado', category: 'Cafés', title: 'Café coado no pano', description: 'Passado na hora, no coador de pano.', image: cafeCoado, featured: true },
      { id: 'cappuccino', category: 'Cafés', title: 'Cappuccino', description: 'Servido na xícara da casa.', image: cappuccino },
      { id: 'latte', category: 'Cafés', title: 'Latte', description: 'Espresso e leite vaporizado em camadas.', image: latte },
      { id: 'espresso', category: 'Cafés', title: 'Espresso italiano ou carioca', description: 'Curto e intenso, ou na versão carioca, mais suave.' },
      { id: 'macchiato', category: 'Cafés', title: 'Espresso macchiato', description: 'Espresso com uma camada de espuma de leite.' },
      { id: 'flat-white', category: 'Cafés', title: 'Flat white', description: 'Espresso com leite vaporizado e pouca espuma.' },
      { id: 'cafe-laranja', category: 'Cafés', title: 'Café com suco de laranja', description: 'Espresso sobre suco de laranja, com rodela da fruta.', image: cafeLaranja },

      // ---------- Gelados ----------
      { id: 'frappe-caramelo', category: 'Gelados', title: 'Frappé de caramelo', description: 'Com chantilly e calda de caramelo.', image: frappeCaramelo, featured: true },
      { id: 'latte-gelado', category: 'Gelados', title: 'Latte gelado', description: 'Espresso, leite gelado e espuma.', image: latteGelado },
      { id: 'milkshake', category: 'Gelados', title: 'Milkshake', description: 'Com chantilly, calda e marshmallow.', image: milkshake },
      { id: 'soda-italiana', category: 'Gelados', title: 'Soda italiana', description: 'Refrescante, servida no pote de vidro.', image: sodaItaliana },

      // ---------- Café da manhã e almoço ----------
      { id: 'ovos-pao-chapa', category: 'Café da manhã e almoço', title: 'Ovos mexidos com pão na chapa', description: 'Ovos cremosos, tomatinhos e pão na chapa.', image: cafeDaManha, featured: true },
      { id: 'ovos-bacon', category: 'Café da manhã e almoço', title: 'Ovos com bacon', description: 'Ovos mexidos com bacon e pão na chapa.', image: ovosBacon },
      { id: 'misto-quente', category: 'Café da manhã e almoço', title: 'Misto quente', description: 'Presunto e queijo no pão na chapa.', image: mistoQuente },
      { id: 'waffle-queijo', category: 'Café da manhã e almoço', title: 'Waffle de queijo com requeijão', description: 'Crocante por fora, com requeijão cremoso.' },
      { id: 'risoto', category: 'Café da manhã e almoço', title: 'Risoto do dia', description: 'Servido no almoço. Consulte o sabor do dia.', image: risoto },

      // ---------- Salgados ----------
      { id: 'torta-carne', category: 'Salgados', title: 'Torta de carne da vovó', description: 'Carne desfiada com cobertura gratinada.', image: tortaCarne, featured: true },
      { id: 'torta-frango', category: 'Salgados', title: 'Torta de frango', description: 'Massa dourada e recheio cremoso de frango.', image: tortaFrango, featured: true },
      { id: 'empadao-tia-branca', category: 'Salgados', title: 'Empadão da Tia Branca', description: 'Receita de família, um dos mais lembrados pelos clientes.' },
      { id: 'quiche', category: 'Salgados', title: 'Quiche', description: 'Massa amanteigada e recheio gratinado.', image: quiche },
      { id: 'empanadas', category: 'Salgados', title: 'Empanadas argentinas', description: 'Assadas e douradas.', image: empanadas },
      { id: 'pao-batata', category: 'Salgados', title: 'Pão de batata recheado', description: 'Com recheios como Catupiry e alho-poró.' },
      { id: 'bruschetta', category: 'Salgados', title: 'Bruschetta', description: 'Pão tostado com creme, tomatinhos e manjericão.', image: bruschetta },

      // ---------- Doces ----------
      { id: 'red-velvet', category: 'Doces', title: 'Red velvet', description: 'Bem recheado, com cream cheese.', image: redVelvet, featured: true },
      { id: 'bolo-chocolate-calda', category: 'Doces', title: 'Bolo de chocolate com calda', description: 'Calda quente servida na mesa.', image: boloChocolateCalda, featured: true },
      { id: 'bolo-chocolate-sorvete', category: 'Doces', title: 'Bolo de chocolate com sorvete', description: 'Fatia com calda e uma bola de sorvete.', image: boloChocolateSorvete },
      { id: 'brownie-sorvete', category: 'Doces', title: 'Brownie com sorvete', description: 'Brownie quente, sorvete e calda.', image: brownieSorvete, featured: true },
      { id: 'brownie', category: 'Doces', title: 'Brownie', description: 'Com cobertura cremosa de chocolate.', image: brownie },
      { id: 'cuca-banana', category: 'Doces', title: 'Cuca de banana', description: 'Farofa crocante e banana.', image: cucaBanana, featured: true },
      { id: 'torta-cookie', category: 'Doces', title: 'Torta cookie', description: 'Massa de cookie com cobertura de chocolate.', image: tortaCookie },
      { id: 'bolo-cenoura', category: 'Doces', title: 'Bolo de cenoura com chocolate', description: 'Com calda de chocolate por cima.', image: boloCenoura },
      { id: 'bolo-brigadeiro', category: 'Doces', title: 'Bolo de brigadeiro', description: 'Chocolate coberto de granulado.', image: boloBrigadeiro },

      // ---------- Encomendas ----------
      { id: 'bolo-maca', category: 'Encomendas', title: 'Bolo de maçã', description: 'Bolo inteiro sob encomenda.', image: boloMaca },
      { id: 'bolo-banana-integral', category: 'Encomendas', title: 'Bolo de banana integral', description: 'Com cobertura. Bolo inteiro sob encomenda.', image: boloBananaIntegral },
      { id: 'red-velvet-inteiro', category: 'Encomendas', title: 'Red velvet inteiro', description: 'Com cobertura de cream cheese e farofa de red velvet.' },
      { id: 'torta-frango-inteira', category: 'Encomendas', title: 'Torta de frango inteira', description: 'Para a sua mesa ou festa.' },
    ],
  },

  // Vitrine: cada item leva ao iFood (com preços) ou ao WhatsApp para encomendas e retirada.
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
      { title: 'Café da tarde', image: boloFrida, alt: 'Bolo de chocolate com calda ao lado de um vaso da Frida' },
      { title: 'Bem-vindo', image: latte, alt: 'Latte em camadas diante da lousa de boas-vindas' },
      { title: 'Latte gelado', image: latteGelado, alt: 'Latte gelado com espuma na luz da tarde' },
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
    description:
      'Estamos na Rua Dr. Pedro Costa, no Centro de Taubaté, com estacionamento grátis por 30 minutos. Retirada e encomendas pelo WhatsApp; delivery pelo iFood.',
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
