import PropTypes from 'prop-types';

// Converte trechos entre asteriscos em <em>: "Feito *sem* pressa" -> Feito <em>sem</em> pressa.
// O <em> dentro de títulos ganha a serifada itálica do tema (--font-serif).
export default function Emphasis({ children }) {
  if (typeof children !== 'string' || !children.includes('*')) return children ?? null;

  return children.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  );
}

Emphasis.propTypes = {
  children: PropTypes.node,
};
