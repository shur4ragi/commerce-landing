import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Card({
  image,
  imageAlt,
  title,
  description,
  meta,
  placeholder,
  children,
  className = '',
}) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {image ? (
        <figure className={styles.media}>
          <img src={image} alt={imageAlt || title || ''} loading="lazy" />
        </figure>
      ) : placeholder ? (
        <figure className={`${styles.media} ${styles.placeholder}`} aria-hidden="true">
          {placeholder}
        </figure>
      ) : null}
      <div className={styles.body}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        {meta && <span className={styles.meta}>{meta}</span>}
        {children}
      </div>
    </article>
  );
}

Card.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  meta: PropTypes.node,
  placeholder: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
