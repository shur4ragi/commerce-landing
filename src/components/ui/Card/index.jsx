import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Card({
  image,
  imageAlt,
  title,
  description,
  meta,
  children,
  className = '',
}) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {image && (
        <figure className={styles.media}>
          <img src={image} alt={imageAlt || title || ''} loading="lazy" />
        </figure>
      )}
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
  children: PropTypes.node,
  className: PropTypes.string,
};
