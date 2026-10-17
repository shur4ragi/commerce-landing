import content from '../../data/clients/leyas-cafe.js';
import logo from '../../assets/images/leyas/logo.png';
import favicon from '../../assets/images/leyas/favicon.png';

const siteConfig = {
  business: {
    name: "Leya's Café",
    legalName: "Leya's Café",
    description: 'Café, doces e salgados da casa no Independência, em Taubaté.',
    phone: '(12) 99143-9923',
    whatsapp: '5512991439923',
    whatsappMessage: "Olá, Leya's Café! Vim pelo site.",
    email: '',
    address: 'Av. Francisco Alves Monteiro, 701 — Independência, Taubaté - SP',
    hours: 'Seg, qua, qui e sex: 11h às 20h · Sáb: 8h às 20h · Dom: 8h às 17h · Ter: fechado',
    // Pino do perfil no Google Maps (Plus Code XC64+W3).
    coordinates: { lat: -23.0376963, lng: -45.5947859 },
  },

  branding: {
    logo,
    favicon,
    ogImage: '/og-leyas.jpg',
  },

  // Verde-oliva e creme do logo e do cardápio; caramelo dos cafés e doces como destaque.
  theme: {
    primaryColor: '#5B604A',
    secondaryColor: '#EFE8DC',
    accentColor: '#B06B3C',
    textColor: '#2C2E23',
    backgroundColor: '#F8F4EC',
    surfaceColor: '#FFFFFF',
    mutedColor: '#7A7866',
    lineColor: '#E3DBCB',
    fontPrimary: '"Poppins", system-ui, sans-serif',
    fontDisplay: '"Oswald", system-ui, sans-serif',
    fontSerif: '"Instrument Serif", Georgia, serif',
    fontStylesheet:
      'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Bebas+Neue&family=Caveat:wght@600;700&display=swap',
    // Conteúdo mais largo: as seções aproveitam telas grandes.
    containerWidth: '1360px',
    // "Pele" do Leya's nos componentes de destaque (o Fryda usa os valores padrão, em marrom).
    vars: {
      '--skin-hero-bg': '#5B604A',
      '--skin-hero-deep': '#3B3F2E',
      '--skin-warm': '#B06B3C',
      '--skin-ink': '#3E412F',
      '--skin-ink-dark': '#2C2E23',
      '--skin-paper': '#F3EEE3',
      '--skin-dark': '#2F3226',
      '--skin-glow': '#D9A066',
      '--skin-kraft': '#7C8466',
      '--skin-kraft-dark': '#5B604A',
      '--skin-ribbon': '#C98552',
      '--skin-pop': '#B06B3C',
      '--skin-pop-2': '#D9A066',
      '--skin-pop-3': '#8E9A6B',
      '--skin-menu-paper': '#2F3428',
      '--skin-menu-ink': '#F1ECDF',
      '--skin-menu-accent': '#E3A970',
      '--skin-menu-glow': 'rgb(255 255 255 / 0.06)',
      '--skin-font-letter': "'Bebas Neue', 'Oswald', Impact, sans-serif",
      '--skin-font-hand': "'Caveat', cursive",
    },
  },

  social: {
    instagram: 'https://www.instagram.com/leyascaffe/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  seo: {
    title: "Leya's Café — Seu lugar favorito em Taubaté",
    description:
      "Cafés, frappuccinos, Matilda Cake, salgados da casa e açaí no Independência, em Taubaté. Veja o cardápio e peça pelo WhatsApp.",
    ogTitle: "Leya's Café",
    ogDescription: 'Seu lugar favorito em Taubaté. Cardápio completo e pedidos pelo WhatsApp.',
    ogImage: '/og-leyas.jpg',
    locale: 'pt_BR',
    themeColor: '#5B604A',
  },

  headerCta: { label: 'Fazer pedido' },

  navigation: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Experiências', href: '#servicos' },
    { label: 'Cardápio', href: '#produtos' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Contato', href: '#contato' },
  ],

  features: {
    whatsappFloat: true,
    contactForm: true,
    // Cada seção ocupa pelo menos uma tela.
    fullScreenSections: true,
    // Rolagem suave com inércia no mouse, para as animações de entrada aparecerem por inteiro.
    smoothScroll: true,
    // Simulação de pedido desligada (desktop e mobile) até ser refeita.
    simulation: false,
  },
};

const client = {
  id: 'leyas-cafe',
  config: siteConfig,
  content,
  sections: [
    'cardHero',
    'about',
    'statement',
    'services',
    'journey',
    // O cardápio entra como cobertura derretendo logo depois do passo a passo.
    { id: 'products', reveal: 'drip' },
    'gallery',
    // Motivos para voltar + avaliações do Google numa seção só.
    'reviews',
    'instagram',
    'coffeeContact',
  ],
};

export default client;
