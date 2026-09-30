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
      'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap',
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
  },
};

const client = {
  id: 'leyas-cafe',
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
