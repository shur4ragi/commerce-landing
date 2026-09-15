import { useSite } from '../../hooks/useSite.js';
import { Card, Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function Products() {
  const { content } = useSite();
  const products = content.products;

  return (
    <Section
      id={products.id}
      eyebrow={products.eyebrow}
      title={products.title}
      description={products.description}
      tone="accent"
    >
      <Reveal>
        <div className={styles.grid}>
          {products.items.map((item) => (
            <Card
              key={item.title}
              image={item.image}
              imageAlt={item.title}
              title={item.title}
              description={item.description}
              meta={item.price}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
