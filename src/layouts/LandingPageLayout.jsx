import { resolveSections } from '../config/sections.js';
import { useSite } from '../hooks/useSite.js';
import Header from '../components/Header/index.jsx';
import Footer from '../components/Footer/index.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat/index.jsx';

export default function LandingPageLayout() {
  const { sections } = useSite();
  const resolved = resolveSections(sections);

  return (
    <>
      <Header />
      <main>
        {resolved.map(({ id, Component: SectionComponent }) => (
          <SectionComponent key={id} />
        ))}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
