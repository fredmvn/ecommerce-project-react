export function formatMoney(amountCens) {
  return `$${(amountCens / 100).toFixed(2)}`;
}
