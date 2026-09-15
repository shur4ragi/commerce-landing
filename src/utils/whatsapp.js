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
