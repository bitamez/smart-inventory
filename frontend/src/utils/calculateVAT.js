export const calculateVAT = (amount, vatPercentage) => {
  return (amount * vatPercentage) / 100
}

export const calculateTotalWithVAT = (amount, vatPercentage) => {
  const vat = calculateVAT(amount, vatPercentage)
  return amount + vat
}
