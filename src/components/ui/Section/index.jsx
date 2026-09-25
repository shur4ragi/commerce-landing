import PropTypes from 'prop-types';
import Container from '../Container/index.jsx';
import Emphasis from '../Emphasis/index.jsx';
import styles from './styles.module.css';

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = 'default',
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]}`}>
      <Container>
        {(eyebrow || title || description) && (
          <header className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2><Emphasis>{title}</Emphasis></h2>}
            {description && <p className={styles.lead}>{description}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  tone: PropTypes.oneOf(['default', 'inverse', 'accent']),
};
