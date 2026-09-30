import { useEffect, useState } from 'react';
import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { ActionSkeleton, Button, Container } from '../ui';
import { CartButton } from '../OrderCart';
import styles from './styles.module.css';

export default function Header() {
  const { config, navigation, whatsappUrl } = useSite();
  const [open, setOpen] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [elevated, setElevated] = useState(false);
  const outbound = usePendingAction();
  // Texto do botão que abre o WhatsApp; cada cliente define o seu (ex.: "Fazer pedido").
  const ctaLabel = config.headerCta?.label || 'Reservar';

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

  useEffect(() => {
    if (!open) {
      setMenuReady(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setMenuReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, [open]);

  const close = () => setOpen(false);

  const reserve = (event) => {
    event.preventDefault();
    outbound.run('Abrindo o WhatsApp', () => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  };

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
          {config.branding.wordmark ? (
            // Logo horizontal com o nome: substitui o ícone + nome em texto.
            <img className={styles.wordmark} src={config.branding.wordmark} alt={config.business.name} />
          ) : (
            <>
              {config.branding.logo ? (
                <img src={config.branding.logo} alt="" width="36" height="36" />
              ) : null}
              <span>{config.business.name}</span>
            </>
          )}
        </a>

        <nav className={styles.desktop} aria-label="Principal">
          {navigation.map((item) => (
            <a key={item.href} className={styles.navLink} href={item.href}>{item.label}</a>
          ))}
          <Button type="button" className={styles.reserve} onClick={reserve}>
            <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            {ctaLabel}
          </Button>
        </nav>

        {config.features?.ordering !== false ? (
          <CartButton className={styles.cart} data-tour="cart" />
        ) : null}

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
            {menuReady ? (
              <>
                {navigation.map((item) => (
                  <a key={item.href} className={styles.navLink} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>{item.label}</a>
                ))}
                <Button type="button" className={styles.reserve} onClick={reserve}>{ctaLabel}</Button>
              </>
            ) : (
              <ActionSkeleton variant="menu" label="Abrindo o menu" />
            )}
          </Container>
        </div>
      )}
      {outbound.pending ? <ActionSkeleton variant="whatsapp" scope="screen" label={outbound.label} /> : null}
    </header>
  );
}
