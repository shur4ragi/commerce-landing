import PropTypes from 'prop-types';
import { usePendingAction } from '../../hooks/usePendingAction.js';
import { ActionSkeleton } from '../ui';

// Links que levam para fora do site (WhatsApp, iFood): mostram a tela de carregamento do
// destino antes de abrir a nova aba, como os demais botões de WhatsApp da landing.
const SKELETONS = {
  whatsapp: { variant: 'whatsapp', label: 'Abrindo o WhatsApp' },
  ifood: { variant: 'ifood', label: 'Abrindo o iFood' },
};

export default function OutboundLink({ href, type, className = '', children, ...props }) {
  const outbound = usePendingAction();
  const skeleton = SKELETONS[type];

  return (
    <>
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(event) => {
          if (!skeleton) return;
          event.preventDefault();
          outbound.run(skeleton.label, () => {
            window.open(href, '_blank', 'noopener,noreferrer');
          });
        }}
        {...props}
      >
        {children}
      </a>
      {outbound.pending && skeleton ? (
        <ActionSkeleton variant={skeleton.variant} scope="screen" label={outbound.label} />
      ) : null}
    </>
  );
}

OutboundLink.propTypes = {
  href: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
