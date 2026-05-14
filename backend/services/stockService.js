import pool from '../config/db.js';

// Add stock and record the transaction
export const addStockService = async ({ product_id, quantity, transaction_type = 'stock_in', performed_by, notes }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const direction = transaction_type === 'stock_out' ? -1 : 1;
    const product = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [product_id]);
    if (!product.rows.length) throw new Error('Product not found');

    if (transaction_type === 'stock_out' && product.rows[0].stock_quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    await client.query(
      `UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2`,
      [direction * quantity, product_id]
    );

    const txn = await client.query(
      `INSERT INTO stock_transactions (product_id, transaction_type, quantity, performed_by, notes)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [product_id, transaction_type, quantity, performed_by, notes]
    );

    await client.query('COMMIT');
    return txn.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Get all stock transactions
export const getAllStockService = async () => {
  const result = await pool.query(
    `SELECT st.*, p.product_name, p.sku, pr.full_name as performed_by_name
     FROM stock_transactions st
     LEFT JOIN products p ON st.product_id = p.id
     LEFT JOIN profiles pr ON st.performed_by = pr.id
     ORDER BY st.created_at DESC`
  );
  return result.rows;
};
