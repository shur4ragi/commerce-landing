import content from '../../data/clients/nanica.js';
import logo from '../../assets/images/nanica/logo.svg';

const siteConfig = {
  business: {
    name: 'Nanica Taubaté',
    legalName: 'Nanica Taubaté',
    description: 'A melhor Banoffee do Brasil, agora no Jardim Eulália, em Taubaté.',
    phone: '(12) 98858-1497',
    whatsapp: '5512988581497',
    whatsappMessage: 'Olá, Nanica Taubaté! Vim pelo site.',
    email: '',
    address: 'Av. Juscelino Kubitschek de Oliveira, 15 — Jardim Eulália, Taubaté - SP, 12010-600',
    hours: 'Balcão: 8h às 22h · Dom e feriados: 8h às 20h · Delivery: 10h às 22h',
    // Pino do link "Endereço" da bio (Google Maps).
    coordinates: { lat: -23.03298, lng: -45.56107 },
  },

  branding: {
    logo,
    favicon: logo,
    ogImage: '/og-nanica.jpg',
  },

  // Chocolate e caramelo do logo; o amarelo banana das embalagens entra como cor de apoio
  // (fundos de seção, cards, rodapé), nunca como texto sobre o creme.
  theme: {
    primaryColor: '#622803',
    secondaryColor: '#FDDB86',
    accentColor: '#9A4513',
    textColor: '#3A1A05',
    backgroundColor: '#FDF8E5',
    surfaceColor: '#FFFFFF',
    mutedColor: '#86674A',
    lineColor: '#F0DFB5',
    fontPrimary: '"Nunito", system-ui, sans-serif',
    // Serifada gordinha e macia, na linha dos títulos retrô do cardápio.
    fontDisplay: '"Fraunces", Georgia, serif',
    fontSerif: '"Fraunces", Georgia, serif',
    fontStylesheet:
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..900,100;1,9..144,400..900,100&family=Nunito:wght@400;600;700;800&display=swap',
  },

  social: {
    instagram: 'https://www.instagram.com/nanica.sp.taubate/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  seo: {
    title: 'Nanica Taubaté — A melhor Banoffee do Brasil',
    description:
      'Banoffee, Monoffee, Uvoffee e tortas inteiras no Jardim Eulália, em Taubaté. Balcão das 8h às 22h, delivery pelo iFood e 99Food e encomendas pelo WhatsApp.',
    ogTitle: 'Nanica Taubaté',
    ogDescription: 'Amizade boa não é reta, é torta! Cardápio completo e pedidos pelo WhatsApp.',
    ogImage: '/og-nanica.jpg',
    locale: 'pt_BR',
    themeColor: '#622803',
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
  },
};

const client = {
  id: 'nanica',
  config: siteConfig,
  content,
  // Sem 'testimonials': ainda não temos avaliações reais da unidade de Taubaté.
  sections: [
    'intro',
    'hero',
    'about',
    'statement',
    'process',
    'services',
    'products',
    'gallery',
    'highlights',
    'contact',
  ],
};

export default client;
