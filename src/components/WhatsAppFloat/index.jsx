import { useSite } from '../../hooks/useSite.js';
import styles from './styles.module.css';

export default function WhatsAppFloat() {
  const { config, whatsappUrl } = useSite();

  if (!config.features?.whatsappFloat) return null;

  return (
    <a
      className={styles.float}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
    >
      WA
    </a>
  );
}
