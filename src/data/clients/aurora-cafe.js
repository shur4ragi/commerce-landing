import heroImage from '../../assets/images/hero-cup.svg';
import aboutImage from '../../assets/images/about-space.svg';
import gallery1 from '../../assets/images/gallery-01.svg';
import gallery2 from '../../assets/images/gallery-02.svg';
import gallery3 from '../../assets/images/gallery-03.svg';
import gallery4 from '../../assets/images/gallery-04.svg';
import gallery5 from '../../assets/images/gallery-05.svg';
import gallery6 from '../../assets/images/gallery-06.svg';
import productEspresso from '../../assets/images/product-espresso.svg';
import productBrunch from '../../assets/images/product-brunch.svg';
import productPastry from '../../assets/images/product-pastry.svg';
import productFilter from '../../assets/images/product-filter.svg';
import productCortado from '../../assets/images/product-cortado.svg';
import productColdbrew from '../../assets/images/product-coldbrew.svg';
import productCookie from '../../assets/images/product-cookie.svg';
import productBeans from '../../assets/images/product-beans.svg';
import productEggs from '../../assets/images/product-eggs.svg';

const content = {
  hero: {
    eyebrow: 'Vila Madalena · São Paulo',
    title: 'O dia começa quando o café encontra a luz.',
    highlight: 'encontra a luz.',
    description: 'Aurora Café é um espaço de extração lenta, brunch de casa e conversa sem pressa. Grãos de origem, torra clara e um salão pensado para ficar.',
    primaryCta: { label: 'Reservar mesa', href: '#contato' },
    secondaryCta: { label: 'Ver cardápio', href: '#produtos' },
    tutorialCta: { label: 'Simular pedido' },
    image: heroImage,
    imageAlt: 'Xícara de café especial com crema dourada',
    metrics: [
      { value: '12', label: 'Origens no menu' },
      { value: '8h', label: 'Abre com a cidade' },
      { value: '100%', label: 'Torra rastreável' },
    ],
  },

  about: {
    id: 'sobre',
    eyebrow: 'A casa',
    title: 'Um café que trata extração como ofício.',
    text: 'Abrimos a porta para quem quer um espresso bem extraído, um filtro que respeita o terroir e um prato que não compete com a xícara. A Aurora nasceu da ideia de que hospitalidade também é técnica: água, temperatura, tempo e atenção.',
    image: aboutImage,
    imageAlt: 'Salão do Aurora Café com bancada de extração',
    facts: [
      { value: '2019', label: 'Ano de abertura' },
      { value: 'Espresso & filtro', label: 'Métodos do dia' },
      { value: 'Brunch', label: 'Sábados e domingos' },
    ],
  },

  services: {
    id: 'servicos',
    eyebrow: 'Experiências',
    title: 'Mais do que uma xícara.',
    description: 'Do counter ao salão, cada serviço foi desenhado para um ritmo diferente do dia.',
    items: [
      {
        title: 'Barista counter',
        description: 'Espresso, cortado e filtrados da semana, extraídos na hora.',
        image: productEspresso,
      },
      {
        title: 'Brunch de casa',
        description: 'Ovos, pães de fermentação e pratos curtos que conversam com o café.',
        image: productBrunch,
      },
      {
        title: 'Doces da confeitaria',
        description: 'Croissants, tortas e cookies assados no próprio forno.',
        image: productPastry,
      },
      {
        title: 'Venda de grãos',
        description: 'Pacotes de 250g com receita de extração para levar.',
        image: productFilter,
      },
    ],
  },

  products: {
    id: 'produtos',
    eyebrow: 'Cardápio',
    title: 'O que está na xícara agora.',
    description: 'Seleção rotativa. Os métodos mudam com a safra; o cuidado, não.',
    viewAllLabel: 'Ver todos',
    savedLabel: 'Salvos',
    orderLabel: 'Pedir no WhatsApp',
    saveLabel: 'Salvar',
    savedItemLabel: 'Salvo',
    emptySaved: 'Nenhum item salvo ainda. Abra um prato e toque em salvar para guardar.',
    items: [
      {
        id: 'espresso-aurora',
        category: 'Café',
        title: 'Espresso Aurora',
        description: 'Blend da casa, chocolate ao leite e casca de laranja.',
        details: 'Extração de 28 segundos, 18g de café. Corpo médio, crema persistente.',
        price: 'R$ 12',
        image: productEspresso,
      },
      {
        id: 'cortado',
        category: 'Café',
        title: 'Cortado',
        description: 'Espresso com um véu de leite vaporizado, sem açúcar.',
        details: 'Proporção 1:1. Serve em copo de 120ml, para beber na hora.',
        price: 'R$ 14',
        image: productCortado,
      },
      {
        id: 'cappuccino',
        category: 'Café',
        title: 'Cappuccino da casa',
        description: 'Espresso, leite e microespuma. Sem calda, sem canela obrigatória.',
        details: 'Leite integral por padrão. Vegetal sob consulta no counter.',
        price: 'R$ 16',
        image: productEspresso,
        options: [
          {
            id: 'milk',
            label: 'Leite',
            type: 'single',
            required: true,
            choices: [
              { id: 'integral', label: 'Integral', price: 0 },
              { id: 'vegetal', label: 'Vegetal', price: 3 },
            ],
          },
        ],
      },
      {
        id: 'mocha-aurora',
        category: 'Café',
        title: 'Mocha Aurora',
        description: 'Espresso, chocolate 70% da confeitaria e leite.',
        details: 'Chocolate derretido na hora, não calda pronta. Chantilly opcional.',
        price: 'R$ 18',
        image: productCortado,
        options: [
          {
            id: 'topping',
            label: 'Extras',
            type: 'multi',
            choices: [
              { id: 'chantilly', label: 'Chantilly', price: 4 },
            ],
          },
        ],
      },
      {
        id: 'filtro-semana',
        category: 'Filtrados',
        title: 'Filtro da semana',
        description: 'V60 ou Kalita, origem única anunciada no quadro.',
        details: 'Moagem e receita mudam com o lote. Pergunte a origem no quadro negro.',
        price: 'R$ 18',
        image: productFilter,
        options: [
          {
            id: 'method',
            label: 'Método',
            type: 'single',
            required: true,
            choices: [
              { id: 'v60', label: 'V60', price: 0 },
              { id: 'kalita', label: 'Kalita', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'v60-gesha',
        category: 'Filtrados',
        title: 'V60 especial',
        description: 'Origem pontual, extração mais longa, xícara limpa.',
        details: 'Serve 220ml. Pedido único por vez — a extração não espera.',
        price: 'R$ 24',
        image: productFilter,
      },
      {
        id: 'cold-brew',
        category: 'Filtrados',
        title: 'Cold brew',
        description: 'Infusão de 16 horas, servido com gelo e casca de laranja.',
        details: 'Sem diluição extra. Pedir sem gelo no counter, se quiser levar.',
        price: 'R$ 17',
        image: productColdbrew,
      },
      {
        id: 'brunch-casa',
        category: 'Brunch',
        title: 'Brunch da casa',
        description: 'Ovos, pão, folhados e uma xícara à escolha.',
        details: 'Sábados e domingos. Inclui uma bebida de espresso ou filtro do dia.',
        price: 'R$ 54',
        image: productBrunch,
        options: [
          {
            id: 'drink',
            label: 'Bebida inclusa',
            type: 'single',
            required: true,
            choices: [
              { id: 'espresso', label: 'Espresso', price: 0 },
              { id: 'filter', label: 'Filtro do dia', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'ovos-benedict',
        category: 'Brunch',
        title: 'Ovos benedict',
        description: 'Pão de fermentação, ovos poche e holandesa da casa.',
        details: 'Serve com folhas e uma xícara filtrada. Disponível até 14h.',
        price: 'R$ 42',
        image: productEggs,
      },
      {
        id: 'tapioca-queijo',
        category: 'Brunch',
        title: 'Tapioca de queijo',
        description: 'Queijo da serra, manteiga e flor de sal.',
        details: 'Pedido no salão o dia todo. Adicione ovo por R$ 8.',
        price: 'R$ 28',
        image: productBrunch,
        options: [
          {
            id: 'extras',
            label: 'Adicionais',
            type: 'multi',
            choices: [
              { id: 'egg', label: 'Ovo', price: 8 },
            ],
          },
        ],
      },
      {
        id: 'croissant',
        category: 'Confeitaria',
        title: 'Croissant de manteiga',
        description: 'Folhado laminado, assado em lotes curtos.',
        details: 'Sai do forno às 8h, 10h e 12h. Fora desses horários, o que restar.',
        price: 'R$ 16',
        image: productPastry,
      },
      {
        id: 'cookie-chocolate',
        category: 'Confeitaria',
        title: 'Cookie de chocolate',
        description: 'Massa amanteigada, gotas 70% e flor de sal.',
        details: 'Assado sob demanda. Leva cerca de 12 minutos.',
        price: 'R$ 14',
        image: productCookie,
      },
      {
        id: 'torta-limao',
        category: 'Confeitaria',
        title: 'Torta de limão',
        description: 'Base sablée, curd de limão-taiti e merengue.',
        details: 'Fatia da tarde. Termina quando acaba — não fazemos reserva de fatia.',
        price: 'R$ 18',
        image: productPastry,
      },
      {
        id: 'blend-250',
        category: 'Grãos',
        title: 'Blend Aurora 250g',
        description: 'O mesmo blend do espresso da casa, para levar.',
        details: 'Torra da semana, com receita de extração no pacote. Moído na hora se pedir.',
        price: 'R$ 42',
        image: productBeans,
        options: [
          {
            id: 'grind',
            label: 'Moagem',
            type: 'single',
            required: true,
            choices: [
              { id: 'bean', label: 'Em grão', price: 0 },
              { id: 'ground', label: 'Moído na hora', price: 0 },
            ],
          },
        ],
      },
      {
        id: 'origem-250',
        category: 'Grãos',
        title: 'Origem única 250g',
        description: 'Lote do filtro da semana, em grão.',
        details: 'Quantidade limitada. Data de torra impressa. Não vendemos moído com mais de 24h.',
        price: 'R$ 48',
        image: productBeans,
      },
    ],
  },

  order: {
    simulateLabel: 'Simular pedido',
    addToCartLabel: 'Adicionar ao carrinho',
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
        hint: 'Informe seu nome para que o estabelecimento saiba quem realizou o pedido.',
      },
      {
        id: 'phone',
        key: 'phone',
        label: 'Telefone',
        type: 'tel',
        required: true,
        tour: 'customer-phone',
        hint: 'Informe um telefone para o estabelecimento confirmar o pedido.',
      },
      {
        id: 'address',
        key: 'address',
        label: 'Endereço',
        required: true,
        tour: 'customer-address',
        hint: 'Informe a rua ou o local de entrega.',
      },
      {
        id: 'number',
        key: 'number',
        label: 'Número',
        required: true,
        tour: 'customer-number',
        hint: 'Informe o número do endereço.',
      },
      {
        id: 'complement',
        key: 'complement',
        label: 'Complemento',
        required: false,
        tour: 'customer-complement',
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
        hint: 'Use este campo para pedidos especiais, como sem açúcar ou ponto da bebida.',
      },
    ],
  },

  gallery: {
    id: 'galeria',
    eyebrow: 'Galeria',
    title: 'O salão, a luz e o counter.',
    items: [
      { title: 'Counter de extração', image: gallery1, alt: 'Bancada de café com máquina espresso' },
      { title: 'Mesa junto à janela', image: gallery2, alt: 'Mesa de madeira com xícara ao lado da janela' },
      { title: 'Folhados da manhã', image: gallery3, alt: 'Bandeja de croissants recém-assados' },
      { title: 'Grãos da semana', image: gallery4, alt: 'Sacos de café em grão sobre prateleira' },
      { title: 'Brunch servido', image: gallery5, alt: 'Prato de brunch com ovos e pão' },
      { title: 'Cantinho de leitura', image: gallery6, alt: 'Poltrona e prateleira de livros no café' },
    ],
  },

  highlights: {
    id: 'diferenciais',
    eyebrow: 'Por que a Aurora',
    title: 'O que não abre mão.',
    items: [
      { title: 'Origem rastreável', description: 'Cada lote chega com fazenda, processo e data de torra.' },
      { title: 'Água tratada', description: 'Receita de água ajustada para espresso e filtrados.' },
      { title: 'Forno próprio', description: 'Pães e folhados saem da confeitaria da casa, não de fornecedor genérico.' },
      { title: 'Mesa sem pressa', description: 'Não cobramos couvert de tempo. O salão existe para ficar.' },
    ],
  },

  testimonials: {
    id: 'depoimentos',
    eyebrow: 'Quem volta',
    title: 'O que dizem à mesa.',
    items: [
      {
        name: 'Marina Costa',
        role: 'Arquiteta',
        quote: 'O filtro da semana é o motivo pelo qual eu desvio o caminho para o trabalho. Silêncio bom e extração impecável.',
      },
      {
        name: 'Pedro Nunes',
        role: 'Fotógrafo',
        quote: 'Luz da manhã, croissant quente e um cortado que não decepciona. Virei freguês da quarta-feira.',
      },
      {
        name: 'Lia Fernandes',
        role: 'Professora',
        quote: 'É o único café da região em que o brunch não parece um afterthought. A xícara continua sendo o centro.',
      },
    ],
  },

  cta: {
    title: 'Reserve a mesa da janela.',
    description: 'Fins de semana esgotam cedo. Chame no WhatsApp e confirme horário.',
    buttonLabel: 'Falar no WhatsApp',
  },

  contact: {
    id: 'contato',
    eyebrow: 'Contato',
    title: 'Passe, escreva ou reserve.',
    description: 'Respondemos no mesmo expediente. Para grupos acima de seis pessoas, prefira WhatsApp.',
    form: {
      nameLabel: 'Nome',
      phoneLabel: 'WhatsApp',
      messageLabel: 'Mensagem',
      submitLabel: 'Enviar pelo WhatsApp',
      consent: 'Autorizo o contato para confirmar a reserva.',
    },
  },
};

export default content;
