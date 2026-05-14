// Calculate VAT amount and return breakdown
export const calculateVAT = (subtotal, vatPercentage = 15) => {
  const vatAmount = (subtotal * vatPercentage) / 100;
  const total = subtotal + vatAmount;
  return { vatAmount: parseFloat(vatAmount.toFixed(2)), total: parseFloat(total.toFixed(2)) };
};
