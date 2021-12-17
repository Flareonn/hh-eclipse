export function getCurrencyByCharCode(charCode) {
  return this.currencies.find((currency) => currency.CharCode === charCode);
}