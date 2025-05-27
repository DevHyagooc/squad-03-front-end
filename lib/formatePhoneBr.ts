export function formatPhoneBr(value: string): string {
  // só dígitos, até 11
  const digits = value.replace(/\D/g, '').slice(0, 11);

  // DDD
  const ddd = digits.slice(0, 2);
  // primeiro dígito (normalmente 9 para celular)
  const prefix1 = digits.slice(2, 3);
  // próximo bloco de 4 dígitos
  const prefix2 = digits.slice(3, 7);
  // últimos 4 dígitos
  const suffix = digits.slice(7, 11);

  let result = '';
  if (ddd) {
    result += `(${ddd})`;
  }
  if (prefix1) {
    result += ` ${prefix1}`;
  }
  if (prefix2) {
    result += ` ${prefix2}`;
  }
  if (suffix) {
    result += `-${suffix}`;
  }

  return result.trim();
}
