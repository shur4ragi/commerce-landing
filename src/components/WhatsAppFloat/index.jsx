import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { ActionSkeleton } from '../ui';
import styles from './styles.module.css';

export default function WhatsAppFloat() {
  const { config, whatsappUrl } = useSite();
  const outbound = usePendingAction();

  if (!config.features?.whatsappFloat) return null;

  return (
    <>
      <button
        type="button"
        className={styles.float}
        aria-label="Falar no WhatsApp"
        onClick={() => outbound.run('Abrindo o WhatsApp', () => {
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        })}
      >
        WA
      </button>
      {outbound.pending ? <ActionSkeleton variant="whatsapp" scope="screen" label={outbound.label} /> : null}
    </>
  );
}
