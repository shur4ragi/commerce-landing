import { useSite } from '../../hooks/useSite.js';
import { useOrder } from '../../hooks/useOrder.js';
import LocationMap from '../LocationMap';
import ScrollAnimatedCoffee from './ScrollAnimatedCoffee';
import { Button, Container, Reveal } from '../ui';
import styles from './styles.module.css';

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.4c-3.4 0-6.15 2.64-6.15 5.9 0 4.42 5.45 10.15 5.7 10.4a.64.64 0 0 0 .9 0c.25-.25 5.7-5.98 5.7-10.4 0-3.26-2.75-5.9-6.15-5.9Zm0 8.05a2.16 2.16 0 1 1 0-4.32 2.16 2.16 0 0 1 0 4.32Z"
      />
    </svg>
  );
}

export default function Hero() {
  const { content, config } = useSite();
  const { startTutorial } = useOrder();
  const hero = content.hero;
  const business = config.business;

  return (
    <section className={styles.hero} id="inicio">
      <Container className={styles.grid}>
        <Reveal>
          <LocationMap
            latitude={business.coordinates?.lat}
            longitude={business.coordinates?.lng}
            name={business.name}
            address={business.address}
            buttonLabel={hero.eyebrow}
            className={styles.locationMap}
          >
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <span className={styles.mapIcon}>
              <MapIcon />
            </span>
          </LocationMap>
          <h1>
            {hero.title.replace(hero.highlight || '', '')}
            {hero.highlight && <em> {hero.highlight}</em>}
          </h1>
          <p className={styles.lead}>{hero.description}</p>
          <div className={styles.actions}>
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost">{hero.secondaryCta.label}</Button>
            {hero.tutorialCta ? (
              <Button type="button" variant="ghost" onClick={startTutorial}>
                {hero.tutorialCta.label}
              </Button>
            ) : null}
          </div>
          <ul className={styles.metrics}>
            {hero.metrics.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          {/* ScrollAnimatedCoffee substitui o visual estático */}
          <figure className={styles.visual}>
            <ScrollAnimatedCoffee />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
