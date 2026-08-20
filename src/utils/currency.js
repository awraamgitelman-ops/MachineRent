// Currency rates and formatting utilities

export const CURRENCY_RATES = {
  UAH: 1,
  USD: 0.024, // ~41.5 UAH per USD
  EUR: 0.022, // ~45.0 UAH per EUR
};

export const CURRENCY_SYMBOLS = {
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

export function formatPrice(uahAmount, currency = 'UAH', showPeriod = false, period = 'доба') {
  if (uahAmount === undefined || uahAmount === null) return 'За запитом';
  
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = Math.round(uahAmount * rate);
  const symbol = CURRENCY_SYMBOLS[currency] || '₴';

  // Format with space thousands separator
  const formattedNumber = new Intl.NumberFormat('uk-UA').format(converted);

  if (currency === 'USD' || currency === 'EUR') {
    return `${symbol}${formattedNumber}${showPeriod ? ` / ${period}` : ''}`;
  }
  return `${formattedNumber} ${symbol}${showPeriod ? ` / ${period}` : ''}`;
}

export function formatNumber(num) {
  return new Intl.NumberFormat('uk-UA').format(num);
}
