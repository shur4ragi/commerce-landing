import { useSite } from '../../hooks/useSite.js';
import { Button, Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function CallToAction() {
  const { content, whatsappUrl } = useSite();
  const cta = content.cta;

  return (
    <Section tone="accent">
      <Reveal>
        <div className={styles.banner}>
          <div>
            <h2>{cta.title}</h2>
            <p>{cta.description}</p>
          </div>
          <Button href={whatsappUrl} target="_blank" variant="whatsapp">
            {cta.buttonLabel}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
