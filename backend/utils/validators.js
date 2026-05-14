// Validation helpers for backend
export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== '';

export const isPositiveNumber = (value) => !isNaN(value) && Number(value) > 0;

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateSalePayload = ({ customer_name, items }) => {
  const errors = [];
  if (!isRequired(customer_name)) errors.push('customer_name is required');
  if (!items || !Array.isArray(items) || items.length === 0) errors.push('At least one item is required');
  items?.forEach((item, i) => {
    if (!item.product_id) errors.push(`Item ${i + 1}: product_id is required`);
    if (!isPositiveNumber(item.quantity)) errors.push(`Item ${i + 1}: quantity must be positive`);
    if (!isPositiveNumber(item.unit_price)) errors.push(`Item ${i + 1}: unit_price must be positive`);
  });
  return errors;
};
