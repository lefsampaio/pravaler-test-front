

const CPFmask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}
const phoneMask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)$/, "$1");
}
const currencyMask = (value) => {
  const result = value.replace(/\D/g, '');

  if (result.length === 1) {
    return result.replace(/^(\d)/, 'R$ 0,0$1');
  }

  if (result.length === 2) {
    return result.replace(/^(\d\d)/, 'R$ 0,$1');
  }

  if (result.length === 3) {
    return result.replace(/^(^0?)(^\d)(\d\d$)/, 'R$ $2,$3');
  }

  if (result.length >= 4 && result.length <= 5) {
    return result.replace(/^(^0?)(\d*)(\d\d$)/, 'R$ $2,$3');
  }

  if (result.length >= 6 && result.length <= 8) {
    return result.replace(/^(\d*)(\d{3})(\d\d$)/, 'R$ $1.$2,$3');
  }

  if (result.length >= 9) {
    return result.replace(/^(\d)(\d{3})(\d{3})(\d{2}).*/, 'R$ $1.$2.$3,$4');
  }

  return result;
};
const maskOnlyLetters = (value) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};
const removeCurrencyMask = (value) => parseFloat(
  value
    .replace('R$ ', '')
    .replace('.', '')
    .replace(',', '.'),
);

export { currencyMask, removeCurrencyMask, CPFmask, phoneMask, maskOnlyLetters };
