import { useEffect, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Button, Container } from '../ui';
import styles from './styles.module.css';

export default function Header() {
  const { config, navigation, whatsappUrl } = useSite();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  const handleNavClick = (event, href) => {
    close();
    if (!href?.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    });
  };

  return (
    <header className={`${styles.header} ${elevated ? styles.elevated : ''}`}>
      <Container className={styles.bar}>
        <a className={styles.brand} href="#inicio" onClick={(event) => handleNavClick(event, '#inicio')}>
          {config.branding.logo ? (
            <img src={config.branding.logo} alt="" width="36" height="36" />
          ) : null}
          <span>{config.business.name}</span>
        </a>

        <nav className={styles.desktop} aria-label="Principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <Button href={whatsappUrl} target="_blank">Reservar</Button>
        </nav>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </Container>

      {open && (
        <div className={styles.mobile} role="dialog" aria-label="Menu">
          <Container>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>{item.label}</a>
            ))}
            <Button href={whatsappUrl} target="_blank">Reservar</Button>
          </Container>
        </div>
      )}
    </header>
  );
}
