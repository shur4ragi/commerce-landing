import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { ActionSkeleton, Button, Emphasis, Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function CallToAction() {
  const { content, whatsappUrl } = useSite();
  const outbound = usePendingAction();
  const cta = content.cta;

  return (
    <Section tone="accent">
      <Reveal>
        <div className={styles.banner}>
          <div>
            <h2><Emphasis>{cta.title}</Emphasis></h2>
            <p>{cta.description}</p>
          </div>
          <Button
            type="button"
            variant="whatsapp"
            onClick={() => outbound.run('Abrindo o WhatsApp', () => {
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            })}
          >
            {cta.buttonLabel}
          </Button>
        </div>
      </Reveal>
      {outbound.pending ? <ActionSkeleton variant="whatsapp" scope="screen" label={outbound.label} /> : null}
    </Section>
  );
}
