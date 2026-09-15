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

const content = {
  hero: {
    eyebrow: 'Vila Madalena · São Paulo',
    title: 'O dia começa quando o café encontra a luz.',
    highlight: 'encontra a luz.',
    description: 'Aurora Café é um espaço de extração lenta, brunch de casa e conversa sem pressa. Grãos de origem, torra clara e um salão pensado para ficar.',
    primaryCta: { label: 'Reservar mesa', href: '#contato' },
    secondaryCta: { label: 'Ver cardápio', href: '#produtos' },
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
    items: [
      {
        title: 'Espresso Aurora',
        description: 'Blend da casa, chocolate ao leite e casca de laranja.',
        price: 'R$ 12',
        image: productEspresso,
      },
      {
        title: 'Filtro da semana',
        description: 'V60 ou Kalita, origem única anunciada no quadro.',
        price: 'R$ 18',
        image: productFilter,
      },
      {
        title: 'Brunch da casa',
        description: 'Ovos, pão, folhados e uma xícara à escolha.',
        price: 'R$ 54',
        image: productBrunch,
      },
      {
        title: 'Croissant de manteiga',
        description: 'Folhado laminado, assado em lotes curtos.',
        price: 'R$ 16',
        image: productPastry,
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
