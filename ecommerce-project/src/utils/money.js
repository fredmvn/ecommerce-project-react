export function formatMoney(amountCents) {
  const dollars = amountCents / 100;
  const absAmount = Math.abs(dollars).toFixed(2);
  const sign = dollars > 0 ? "" : "-";

  return `${sign}$${absAmount}`;
}
