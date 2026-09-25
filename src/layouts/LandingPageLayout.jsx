import { resolveSections } from '../config/sections.js';
import { useSite } from '../hooks/useSite.js';
import Entrance from '../components/Entrance/index.jsx';
import Header from '../components/Header/index.jsx';
import Footer from '../components/Footer/index.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat/index.jsx';
import OrderCart from '../components/OrderCart/index.js';
import LandingOrderTour from '../components/OrderTutorial/LandingOrderTour.jsx';

export default function LandingPageLayout() {
  const { sections } = useSite();
  const resolved = resolveSections(sections);

  return (
    <>
      <Entrance />
      <Header />
      <main>
        {resolved.map(({ id, Component: SectionComponent }) => (
          <SectionComponent key={id} />
        ))}
      </main>
      <Footer />
      <WhatsAppFloat />
      <OrderCart />
      <LandingOrderTour />
    </>
  );
}
