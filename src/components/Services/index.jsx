import { useSite } from '../../hooks/useSite.js';
import { Card, Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function Services() {
  const { content } = useSite();
  const services = content.services;

  return (
    <Section
      id={services.id}
      eyebrow={services.eyebrow}
      title={services.title}
      description={services.description}
    >
      <Reveal>
        <div className={styles.grid}>
          {services.items.map((item) => (
            <Card
              key={item.title}
              image={item.image}
              imageAlt={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
