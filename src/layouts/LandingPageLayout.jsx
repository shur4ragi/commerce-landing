import { resolveSections } from '../config/sections.js';
import { useSite } from '../hooks/useSite.js';
import Entrance from '../components/Entrance/index.jsx';
import Header from '../components/Header/index.jsx';
import Footer from '../components/Footer/index.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat/index.jsx';
import OrderCart from '../components/OrderCart/index.js';
import LandingOrderTour from '../components/OrderTutorial/LandingOrderTour.jsx';
import DripReveal from '../components/DripReveal/index.jsx';

export default function LandingPageLayout() {
  const { sections, config } = useSite();
  const ordering = config.features?.ordering !== false;
  const resolved = resolveSections(sections);

  return (
    <>
      <Entrance />
      <Header />
      <main>
        {resolved.map(({ id, reveal, Component: SectionComponent }) =>
          reveal === 'drip' ? (
            <DripReveal key={id}>
              <SectionComponent />
            </DripReveal>
          ) : (
            <SectionComponent key={id} />
          ),
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
      {ordering ? <OrderCart /> : null}
      {ordering ? <LandingOrderTour /> : null}
    </>
  );
}
