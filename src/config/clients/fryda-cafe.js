import content from '../../data/clients/fryda-cafe.js';
import logo from '../../assets/images/fryda/logo.png';
import favicon from '../../assets/images/fryda/favicon.png';

const siteConfig = {
  business: {
    name: 'Fryda Café',
    legalName: 'Fryda Café',
    description: 'Cafés, salgados e doces num café inspirado na Frida Kahlo, no Centro de Taubaté.',
    phone: '(12) 3432-8445',
    whatsapp: '551234328445',
    whatsappMessage: 'Olá, Fryda Café! Vim pelo site.',
    email: '',
    address: 'R. Dr. Pedro Costa, 531 — Centro, Taubaté - SP, 12010-160',
    hours: 'Seg a sex: 9h às 19h · Sáb e feriados: 9h às 18h · Dom: fechado',
    // Plus Code XC9R+JF do perfil no Google Maps.
    coordinates: { lat: -23.03094, lng: -45.55881 },
  },

  branding: {
    logo,
    favicon,
    ogImage: '/og-fryda.jpg',
  },

  // Marrom do logo, caramelo dos destaques do Instagram e o vermelho das flores da Frida.
  theme: {
    primaryColor: '#5A3B2C',
    secondaryColor: '#F3E7D6',
    accentColor: '#B5412F',
    textColor: '#2E1D15',
    backgroundColor: '#FBF5EC',
    surfaceColor: '#FFFFFF',
    mutedColor: '#8C705E',
    lineColor: '#E8D8C3',
    fontPrimary: '"Nunito Sans", system-ui, sans-serif',
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontSerif: '"Playfair Display", Georgia, serif',
    fontStylesheet:
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Nunito+Sans:wght@400;600;700&display=swap',
  },

  social: {
    instagram: 'https://www.instagram.com/frydacafe/',
    facebook: 'https://www.facebook.com/p/Fryda-Caf%C3%A9-100063645397461/',
    youtube: '',
    tiktok: '',
  },

  seo: {
    title: 'Fryda Café — Café inspirado na Frida Kahlo no Centro de Taubaté',
    description:
      'Café da manhã, almoço e café da tarde no Centro de Taubaté: torta de carne da vovó, bolos com calda, café coado no pano e estacionamento grátis. Delivery pelo iFood e encomendas pelo WhatsApp.',
    ogTitle: 'Fryda Café',
    ogDescription: 'Não vamos te vender algo que a gente não comeria.',
    ogImage: '/og-fryda.jpg',
    locale: 'pt_BR',
    themeColor: '#5A3B2C',
  },

  headerCta: { label: 'Encomendar' },

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
    // Vitrine: sem carrinho; o cardápio com preços e o delivery ficam no iFood.
    ordering: false,
  },
};

const client = {
  id: 'fryda-cafe',
  config: siteConfig,
  content,
  sections: [
    'intro',
    'hero',
    'about',
    'statement',
    'services',
    'process',
    // O cardápio entra como cobertura derretendo logo depois do passo a passo.
    { id: 'products', reveal: 'drip' },
    'gallery',
    'highlights',
    'testimonials',
    'contact',
  ],
};

export default client;
