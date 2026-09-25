import Intro from '../components/Intro/index.jsx';
import Hero from '../components/Hero/index.jsx';
import About from '../components/About/index.jsx';
import Statement from '../components/Statement/index.jsx';
import Process from '../components/Process/index.jsx';
import Services from '../components/Services/index.jsx';
import Products from '../components/Products/index.jsx';
import Gallery from '../components/Gallery/index.jsx';
import Highlights from '../components/Highlights/index.jsx';
import Testimonials from '../components/Testimonials/index.jsx';
import CallToAction from '../components/CallToAction/index.jsx';
import Contact from '../components/Contact/index.jsx';

export const sectionRegistry = {
  intro: Intro,
  hero: Hero,
  about: About,
  statement: Statement,
  process: Process,
  services: Services,
  products: Products,
  gallery: Gallery,
  highlights: Highlights,
  testimonials: Testimonials,
  cta: CallToAction,
  contact: Contact,
};

export function resolveSections(sectionIds = []) {
  return sectionIds
    .map((entry) => {
      const id = typeof entry === 'string' ? entry : entry.id;
      const enabled = typeof entry === 'string' ? true : entry.enabled !== false;
      return { id, enabled, Component: sectionRegistry[id] };
    })
    .filter((section) => section.enabled && section.Component);
}
