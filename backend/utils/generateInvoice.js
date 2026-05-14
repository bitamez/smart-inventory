// Generate a unique invoice number: INV-YYYY-XXXX
export const generateInvoiceNumber = async (pool) => {
  const year = new Date().getFullYear();
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM sales WHERE EXTRACT(YEAR FROM created_at) = $1`,
    [year]
  );
  const count = parseInt(result.rows[0].count) + 1;
  return `INV-${year}-${String(count).padStart(4, '0')}`;
};
