import { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSite } from '../../hooks/useSite.js';
import styles from './PaperMenu.module.css';

const SECTIONS = 3;
const PER_SECTION = 3;

// Cardápio de papel impresso (preto no papel creme, com a logo e detalhes na cor da casa),
// inclinado na coluna da direita da seção. Os itens saem do próprio cardápio do site.
// Clicar nele abre o cardápio completo (MenuSheet), que sai daqui e voa para o centro.
const PaperMenu = forwardRef(function PaperMenu({ items, onOpen, away = false }, paperRef) {
  const { config, content } = useSite();
  // products.paperMenu pode ser um objeto com subtítulo, rodapé e estilo (ex.: 'chalk').
  const menuCopy = typeof content.products?.paperMenu === 'object' ? content.products.paperMenu : {};
  const ref = useRef(null);
  const logo = config.branding?.logo;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.in = '';
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const groups = [];
  items.forEach((item) => {
    if (!item.price) return;
    let group = groups.find((entry) => entry.category === item.category);
    if (!group) {
      if (groups.length >= SECTIONS) return;
      group = { category: item.category, items: [] };
      groups.push(group);
    }
    if (group.items.length < PER_SECTION) group.items.push(item);
  });

  return (
    <div ref={ref} className={`${styles.menu} ${away ? styles.away : ''}`}>
      <button type="button" className={styles.hit} onClick={onOpen} aria-label="Abrir o cardápio completo">
        <span className={styles.hint}>Abrir cardápio</span>
      </button>
      <div ref={paperRef} className={`${styles.paper} ${styles.float} ${menuCopy.style === 'chalk' ? styles.chalk : ''}`} aria-hidden="true">
        <header className={styles.head}>
          {logo ? <img src={logo} alt="" /> : null}
          <strong>Cardápio</strong>
          <span>{menuCopy.subtitle || `${config.business.name} · Taubaté`}</span>
        </header>

        {groups.map((group) => (
          <section key={group.category} className={styles.group}>
            <h4>{group.category}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <i />
                  <b>{item.price.replace('R$ ', '')}</b>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className={styles.foot}>{menuCopy.footer || 'Não vamos te vender algo que a gente não comeria.'}</footer>
      </div>
    </div>
  );
});

PaperMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpen: PropTypes.func,
  away: PropTypes.bool,
};

export default PaperMenu;
