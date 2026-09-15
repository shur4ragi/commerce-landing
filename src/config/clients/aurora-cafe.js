import content from '../../data/clients/aurora-cafe.js';
import logo from '../../assets/images/logo.svg';
import favicon from '../../assets/icons/favicon.svg';

const siteConfig = {
  business: {
    name: 'Aurora Café',
    legalName: 'Aurora Café LTDA',
    description: 'Café especial, brunch e doces artesanais no coração da cidade.',
    phone: '(11) 98888-0101',
    whatsapp: '5511988880101',
    whatsappMessage: 'Olá, Aurora Café! Quero reservar uma mesa.',
    email: 'ola@auroracafe.example',
    address: 'Rua das Acácias, 120 — Vila Madalena, São Paulo',
    hours: 'Ter a Dom, das 8h às 19h',
  },

  branding: {
    logo,
    favicon,
    ogImage: '/og-cover.svg',
  },

  theme: {
    primaryColor: '#2C1A12',
    secondaryColor: '#F6EFE6',
    accentColor: '#D4652F',
    textColor: '#241812',
    backgroundColor: '#FBF6F0',
    surfaceColor: '#FFFFFF',
    mutedColor: '#8A7464',
    lineColor: '#E8D9C8',
    fontPrimary: '"Figtree", system-ui, sans-serif',
    fontDisplay: '"Syne", system-ui, sans-serif',
  },

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: '',
    tiktok: '',
  },

  seo: {
    title: 'Aurora Café — Café especial em São Paulo',
    description: 'Grãos de origem, brunch de casa e um espaço para ficar. Aurora Café, Vila Madalena.',
    ogTitle: 'Aurora Café',
    ogDescription: 'Café especial, do grão à xícara.',
    ogImage: '/og-cover.svg',
    locale: 'pt_BR',
    themeColor: '#2C1A12',
  },

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
  id: 'aurora-cafe',
  config: siteConfig,
  content,
  sections: [
    'hero',
    'about',
    'services',
    'products',
    'gallery',
    'highlights',
    'testimonials',
    'cta',
    'contact',
  ],
};

export default client;
