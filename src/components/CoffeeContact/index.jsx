import { useEffect, useRef, useState } from 'react';
import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { openExternal } from '../../utils/openExternal.js';
import { buildWhatsappUrl } from '../../utils/whatsapp.js';
import { scrollToTarget } from '../../utils/smoothScroll.js';
import { ActionSkeleton, CoffeeBean, Emphasis, useInputMask } from '../ui';
import styles from './styles.module.css';

// Formulário final, versão café do envelope da Aflora. Enquanto a pessoa digita, a comanda fica
// para fora do saquinho kraft e é preenchida ao vivo. Ao concluir, a comanda desce, a dobra do
// saquinho fecha, o selo da casa é colado e (só na primeira vez) o saquinho gira soltando grãos.
// Depois o botão vira "Enviar pelo WhatsApp"; editar qualquer campo reabre o saquinho.
const CLOSE_MS = 2200;
const CLOSE_SPIN_MS = 4300;

const BURST = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2 + 0.2;
  const distance = 150 + ((index * 37) % 5) * 22;
  return {
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance * 0.75 - 40,
    r: (index * 77) % 360,
    size: 22 + (index % 3) * 8,
  };
});

const formatDate = (value) =>
  value
    ? new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    : '';

// Linha da comanda: skeleton enquanto o campo está vazio.
function Line({ width, children }) {
  return children ? (
    <span className={styles.filled}>{children}</span>
  ) : (
    <span className={styles.skelLine} style={{ width }} />
  );
}

export default function CoffeeContact() {
  const { config, content } = useSite();
  const contact = content.contact;
  const order = contact?.order;
  const business = config.business;
  const logo = config.branding?.logo;
  const outbound = usePendingAction();

  const [form, setForm] = useState({ type: order?.types?.[0] ?? '', name: '', date: '', message: '' });
  const [phone, handlePhone] = useInputMask('(99) 99999-9999', 'number', '');
  const [bag, setBag] = useState('open'); // open | closing | closed
  const [spin, setSpin] = useState(false);
  const celebrated = useRef(false);
  const timers = useRef([]);
  const bagRef = useRef(null);
  const firstField = useRef(null);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  if (!contact || !order) return null;

  const reopen = () => {
    clearTimers();
    setSpin(false);
    setBag('open');
  };

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    if (bag !== 'open') reopen();
  };

  const onPhone = (event) => {
    handlePhone(event);
    if (bag !== 'open') reopen();
  };

  const conclude = () => {
    if (bag !== 'open') return;
    const first = !celebrated.current;
    celebrated.current = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // No celular o saquinho fica abaixo do formulário: traz ele para a tela antes de animar.
    const rect = bagRef.current?.getBoundingClientRect();
    const offscreen = rect && (rect.top < 60 || rect.bottom > window.innerHeight);
    if (offscreen) scrollToTarget(bagRef.current, { block: 'center', immediate: reduced });

    const start = () => {
      setSpin(first && !reduced);
      setBag('closing');
      timers.current.push(
        window.setTimeout(() => setBag('closed'), reduced ? 300 : first ? CLOSE_SPIN_MS : CLOSE_MS),
      );
    };
    if (offscreen) timers.current.push(window.setTimeout(start, 650));
    else start();
  };

  const text = [
    `Olá, ${business.name}! Vim pelo site.`,
    `• Assunto: ${form.type}`,
    form.date && `• Para: ${formatDate(form.date)}`,
    form.message && `• Pedido: ${form.message}`,
    form.name && `\nMeu nome é ${form.name}.`,
    phone && `WhatsApp: ${phone}.`,
  ]
    .filter(Boolean)
    .join('\n');

  const send = () => {
    outbound.run('Abrindo o WhatsApp', () => openExternal(buildWhatsappUrl(business.whatsapp, text)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bag !== 'closed') {
      conclude();
      return;
    }
    send();
  };

  const edit = () => {
    reopen();
    firstField.current?.focus();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id={contact.id} className={styles.section} aria-labelledby={`${contact.id}-title`}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{contact.eyebrow}</p>
          <h2 id={`${contact.id}-title`} className={styles.title}>
            <Emphasis>{order.title}</Emphasis>
          </h2>
          <p className={styles.lead}>{order.text}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset>
              <legend>{order.typeLegend}</legend>
              <div className={styles.chips}>
                {order.types.map((type, index) => (
                  <label key={type} className={styles.chip}>
                    <input
                      ref={index === 0 ? firstField : undefined}
                      type="radio"
                      name="contact-type"
                      value={type}
                      checked={form.type === type}
                      onChange={set('type')}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>{contact.form.nameLabel}</span>
                <input value={form.name} onChange={set('name')} placeholder="Como podemos te chamar?" autoComplete="given-name" required />
              </label>
              <label className={styles.field}>
                <span>{contact.form.phoneLabel}</span>
                <input type="tel" value={phone} onChange={onPhone} placeholder="(12) 99999-9999" autoComplete="tel" required />
              </label>
            </div>
            <label className={styles.field}>
              <span>{order.dateLabel} <em>(opcional)</em></span>
              <input type="date" min={today} value={form.date} onChange={set('date')} />
            </label>
            <label className={styles.field}>
              <span>{contact.form.messageLabel}</span>
              <textarea rows={3} maxLength={300} value={form.message} onChange={set('message')} placeholder={order.messagePlaceholder} required />
            </label>

            <div className={styles.submitRow}>
              {bag === 'closed' ? (
                <>
                  <button key="send" type="submit" className={`${styles.button} ${styles.send}`}>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" /> {order.sendLabel}
                  </button>
                  <button type="button" className={styles.edit} onClick={edit}>{order.editLabel}</button>
                </>
              ) : (
                <button key="done" type="submit" className={styles.button} disabled={bag === 'closing'}>
                  <i className="fa-solid fa-check" aria-hidden="true" /> {bag === 'closing' ? order.closingLabel : order.concludeLabel}
                </button>
              )}
            </div>
          </form>
        </div>

        <aside className={styles.side}>
          <div
            ref={bagRef}
            // order.container 'box': caixinha de doce com tampa e fita, no lugar do saquinho kraft.
            className={`${styles.stage} ${order.container === 'box' ? styles.box : ''}`}
            data-state={bag}
            data-spin={spin || undefined}
          >
            <div className={styles.spinner}>
              <div className={styles.bag}>
                <span className={styles.back} />
                <span className={styles.fold} />
                <div className={styles.pocket}>
                  <div className={styles.ticket} aria-label="Prévia da comanda">
                    <div className={styles.ticketHead}>
                      <strong>Comanda</strong>
                      <span>{business.name}</span>
                    </div>
                    <p className={styles.ticketType}>{form.type}</p>
                    <dl className={styles.ticketList}>
                      <div><dt>De</dt><dd><Line width="55%">{form.name}</Line></dd></div>
                      <div><dt>Contato</dt><dd><Line width="65%">{phone}</Line></dd></div>
                      <div><dt>Para</dt><dd><Line width="75%">{formatDate(form.date)}</Line></dd></div>
                    </dl>
                    <div className={styles.note}>
                      {form.message ? (
                        <p>{form.message}</p>
                      ) : (
                        <>
                          <span className={styles.skelLine} style={{ width: '92%' }} />
                          <span className={styles.skelLine} style={{ width: '70%' }} />
                        </>
                      )}
                    </div>
                    <p className={styles.thanks}>Obrigado pela preferência ♥</p>
                  </div>
                </div>
                <span className={styles.front}>
                  {logo ? <img className={styles.print} src={logo} alt="" /> : null}
                  <span className={styles.label}>
                    <small>para</small>
                    <b>{form.name || 'você'}</b>
                  </span>
                </span>
                <span className={styles.seal}>{logo ? <img src={logo} alt="" /> : null}</span>
                <span className={styles.steam} aria-hidden="true"><i /><i /><i /></span>
              </div>
            </div>
            <span className={styles.burst} aria-hidden="true">
              {BURST.map((bean, index) => (
                <i
                  key={index}
                  style={{
                    '--dx': `${bean.dx.toFixed(0)}px`,
                    '--dy': `${bean.dy.toFixed(0)}px`,
                    '--r': `${bean.r}deg`,
                    '--k': index,
                    width: bean.size,
                  }}
                >
                  <CoffeeBean tone={index % 2 ? 'light' : 'roast'} />
                </i>
              ))}
            </span>
          </div>

          <p className={styles.hint} aria-live="polite">{order.hints[bag]}</p>

          {/* No celular o saquinho fica abaixo do formulário: o envio aparece aqui também. */}
          {bag === 'closed' ? (
            <div className={styles.bagActions}>
              <button type="button" className={`${styles.button} ${styles.send}`} onClick={send}>
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> {order.sendLabel}
              </button>
              <button type="button" className={styles.edit} onClick={edit}>{order.editLabel}</button>
            </div>
          ) : null}

          <address className={styles.info}>
            {business.address ? <p><i className="fa-solid fa-location-dot" aria-hidden="true" /> {business.address}</p> : null}
            {business.hours ? <p><i className="fa-regular fa-clock" aria-hidden="true" /> {business.hours}</p> : null}
            {business.phone ? (
              <p><i className="fa-solid fa-phone" aria-hidden="true" /> <a href={`tel:${business.phone}`}>{business.phone}</a></p>
            ) : null}
          </address>
        </aside>
      </div>
      {outbound.pending ? <ActionSkeleton variant="whatsapp" scope="screen" label={outbound.label} /> : null}
    </section>
  );
}
