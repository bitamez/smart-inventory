// Format number as Ethiopian Birr currency
export const formatCurrency = (amount, currency = 'Birr') => {
  if (amount === null || amount === undefined) return `0.00 ${currency}`;
  return `${Number(amount).toLocaleString('en-ET', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
};

export const formatNumber = (num) => {
  return Number(num).toLocaleString('en-ET');
};
