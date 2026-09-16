import { useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { buildWhatsappUrl } from '../../utils/whatsapp.js';
import {
  Button,
  CheckboxPadrao,
  Reveal,
  Section,
  useInputMask,
  UseInputPadrao,
} from '../ui';
import styles from './styles.module.css';

export default function Contact() {
  const { config, content } = useSite();
  const contact = content.contact;
  const business = config.business;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [phone, handlePhone] = useInputMask('(99) 99999-9999', 'number', '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = [
      `Olá, ${business.name}!`,
      `Meu nome é ${name}.`,
      phone && `WhatsApp: ${phone}.`,
      message,
    ].filter(Boolean).join('\n');

    window.open(buildWhatsappUrl(business.whatsapp, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <Section
      id={contact.id}
      eyebrow={contact.eyebrow}
      title={contact.title}
      description={contact.description}
    >
      <div className={styles.grid}>
        <Reveal>
          <address className={styles.info}>
            <p><strong>Endereço</strong>{business.address}</p>
            <p><strong>Telefone</strong><a href={`tel:${business.phone}`}>{business.phone}</a></p>
            <p><strong>E-mail</strong><a href={`mailto:${business.email}`}>{business.email}</a></p>
            <p><strong>Horário</strong>{business.hours}</p>
          </address>
        </Reveal>

        {config.features?.contactForm && (
          <Reveal>
            <form className={styles.form} onSubmit={handleSubmit}>
              <UseInputPadrao
                label={contact.form.nameLabel}
                identifier="contact-name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <UseInputPadrao
                label={contact.form.phoneLabel}
                identifier="contact-phone"
                type="tel"
                required
                value={phone}
                onChange={handlePhone}
                placeholder="(11) 99999-9999"
              />
              <UseInputPadrao
                label={contact.form.messageLabel}
                identifier="contact-message"
                type="textarea"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <CheckboxPadrao
                id="contact-consent"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                label={contact.form.consent}
                required
              />
              <Button type="submit" variant="whatsapp">{contact.form.submitLabel}</Button>
            </form>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
