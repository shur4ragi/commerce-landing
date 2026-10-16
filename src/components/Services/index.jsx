import { useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Card, Reveal, Section } from '../ui';
import styles from './styles.module.css';

// layout 'panels': painéis altos de foto inteira; o painel ativo (mouse, foco ou toque) se abre
// e mostra a descrição, os outros ficam estreitos só com o título.
function Panels({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.panels}>
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          className={`${styles.panel} ${index === active ? styles.panelActive : ''}`}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
          aria-expanded={index === active}
          style={{ '--i': index }}
        >
          <img src={item.image} alt="" loading="lazy" />
          <span className={styles.shade} aria-hidden="true" />
          <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.panelBody}>
            <strong>{item.title}</strong>
            <span className={styles.panelText}>{item.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

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
        {services.layout === 'panels' ? (
          <Panels items={services.items} />
        ) : (
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
        )}
      </Reveal>
    </Section>
  );
}
