import { useSite } from '../../hooks/useSite.js';
import { Container } from '../ui';
import styles from './styles.module.css';

const SOCIAL_LABELS = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

export default function Footer() {
  const { config, navigation } = useSite();
  const socials = Object.entries(config.social || {}).filter(([, url]) => url);

  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div>
          <strong>{config.business.name}</strong>
          <p>{config.business.description}</p>
        </div>
        <nav aria-label="Rodapé">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        {socials.length > 0 && (
          <nav aria-label="Redes sociais">
            {socials.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer">{SOCIAL_LABELS[key] || key}</a>
            ))}
          </nav>
        )}
      </Container>
      <Container>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {config.business.legalName || config.business.name}
        </p>
      </Container>
    </footer>
  );
}
