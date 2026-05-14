// Calculate discount amount and return the discounted price
export const calculateDiscount = (amount, discountPercentage = 0) => {
  const discountAmount = (amount * discountPercentage) / 100;
  const discountedAmount = amount - discountAmount;
  return { discountAmount: parseFloat(discountAmount.toFixed(2)), discountedAmount: parseFloat(discountedAmount.toFixed(2)) };
};
