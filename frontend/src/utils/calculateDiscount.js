export const calculateDiscount = (amount, discountPercentage) => {
  return (amount * discountPercentage) / 100
}

export const calculateTotalAfterDiscount = (amount, discountPercentage) => {
  const discount = calculateDiscount(amount, discountPercentage)
  return amount - discount
}
