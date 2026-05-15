export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== ''
}

export const validateNumber = (value) => {
  return !isNaN(value) && value >= 0
}

export const validateSKU = (sku) => {
  return /^[A-Z0-9-]+$/.test(sku)
}
