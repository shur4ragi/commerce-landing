import { useSite } from '../../hooks/useSite.js';
import { Button, Container, Reveal } from '../ui';
import styles from './styles.module.css';

export default function Hero() {
  const { content } = useSite();
  const hero = content.hero;

  return (
    <section className={styles.hero} id="inicio">
      <Container className={styles.grid}>
        <Reveal>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1>
            {hero.title.replace(hero.highlight || '', '')}
            {hero.highlight && <em> {hero.highlight}</em>}
          </h1>
          <p className={styles.lead}>{hero.description}</p>
          <div className={styles.actions}>
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost">{hero.secondaryCta.label}</Button>
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
        {hero.image && (
          <Reveal>
            <figure className={styles.visual}>
              <img src={hero.image} alt={hero.imageAlt} />
            </figure>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
