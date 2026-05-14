export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) => password && password.length >= 6;

export const validateRequired = (value) => value !== null && value !== undefined && String(value).trim() !== '';

export const validatePositiveNumber = (value) => !isNaN(value) && Number(value) > 0;

export const validateSaleForm = ({ customer_name, items }) => {
  const errors = {};
  if (!validateRequired(customer_name)) errors.customer_name = 'Customer name is required';
  if (!items || items.length === 0) errors.items = 'At least one product must be added';
  return errors;
};

export const validateProductForm = ({ sku, product_name, unit_price, stock_quantity }) => {
  const errors = {};
  if (!validateRequired(sku)) errors.sku = 'SKU is required';
  if (!validateRequired(product_name)) errors.product_name = 'Product name is required';
  if (!validatePositiveNumber(unit_price)) errors.unit_price = 'Price must be a positive number';
  if (stock_quantity < 0) errors.stock_quantity = 'Stock cannot be negative';
  return errors;
};
