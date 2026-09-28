export function digitsOnly(value = '') {
  return String(value).replace(/\D/g, '');
}

export function buildWhatsappUrl(phone, message = '') {
  const number = digitsOnly(phone);
  if (!number) return '#contato';

  const base = `https://wa.me/${number}`;
  return message
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}

// Resolve links de pedido do cliente: "whatsapp" monta a URL com o número do negócio e a
// mensagem (com {item} trocado pelo nome do produto); os demais só aparecem se tiverem href.
export function resolveOrderLinks(links = [], whatsapp = '', vars = {}) {
  return links
    .map((link) => {
      if (link.type !== 'whatsapp' || link.href) return link;
      const message = (link.message || '').replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
      return { ...link, href: buildWhatsappUrl(whatsapp, message) };
    })
    .filter((link) => link.href);
}
