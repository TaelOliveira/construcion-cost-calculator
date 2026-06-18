const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const currencyDetailedFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-AU');

export function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return '$0';
  return currencyFormatter.format(Math.round(value));
}

export function formatCurrencyDetailed(value) {
  if (value == null || Number.isNaN(value)) return '$0.00';
  return currencyDetailedFormatter.format(value);
}

export function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return '0';
  return numberFormatter.format(value);
}

export function formatRate(value) {
  return `${formatCurrency(value)}/m²`;
}

export function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}
