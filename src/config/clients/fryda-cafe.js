import content from '../../data/clients/fryda-cafe.js';
import logo from '../../assets/images/logo.svg';
import favicon from '../../assets/icons/favicon.svg';

const siteConfig = {
  business: {
    name: 'Fryda Café',
    legalName: 'Fryda Café',
    description: 'Um local aconchegante, com muito amor e café!',
    phone: '(12) 3432-8445',
    whatsapp: '551234328445',
    whatsappMessage: 'Olá, Fryda Café! Gostaria de mais informações.',
    email: 'frydacafe@gmail.com',
    address: 'Rua Dr. Pedro Costa, 547 — Centro, Taubaté - SP',
    hours: 'Seg a Sex 9h às 19h, Sáb 9h às 18h',
    coordinates: { lat: -23.0266, lng: -45.5558 },
  },

  branding: {
    logo,
    favicon,
    ogImage: '/og-cover.png',
  },

  theme: {
    primaryColor: '#5D3A1A',
    secondaryColor: '#FDF6EE',
    accentColor: '#C47B5B',
    textColor: '#3D2516',
    backgroundColor: '#FFFAF5',
    surfaceColor: '#FFFFFF',
    mutedColor: '#8B7355',
    lineColor: '#E8DDD0',
    fontPrimary: '"Nunito", system-ui, sans-serif',
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontSerif: '"Lora", Georgia, serif',
    fontStylesheet: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:wght@500;600;700&family=Lora:ital@0;1&display=swap',
  },

  social: {
    instagram: 'https://instagram.com/frydacafe',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  seo: {
    title: 'Fryda Café — Cafeteria aconchegante em Taubaté',
    description: 'Tortas, bolos, cafés especiais e almoço no coração de Taubaté. Fryda Café: um local aconchegante, com muito amor e café!',
    ogTitle: 'Fryda Café',
    ogDescription: 'Um local aconchegante, com muito amor e café!',
    ogImage: '/og-cover.png',
    locale: 'pt_BR',
    themeColor: '#5D3A1A',
  },

  navigation: [
    { label: 'Sobre', href: '#sobre' },
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
  id: 'fryda-cafe',
  config: siteConfig,
  content,
  sections: [
    'intro',
    'hero',
    'about',
    'statement',
    'services',
    'products',
    'gallery',
    'highlights',
    'testimonials',
    'contact',
  ],
};

export default client;
