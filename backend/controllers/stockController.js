import pool from '../config/db.js';

// Get all stock transactions
export const getStockTransactions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT st.*, p.product_name, p.sku 
      FROM stock_transactions st
      JOIN products p ON st.product_id = p.id
      ORDER BY st.created_at DESC
    `);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Add new stock (Stock In)
export const addStock = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { product_id, quantity, reference_note, created_by } = req.body;
    
    // Get current stock
    const productResult = await client.query('SELECT stock_quantity FROM products WHERE id = $1', [product_id]);
    if (productResult.rows.length === 0) {
      throw new Error('Product not found');
    }
    
    const previousStock = productResult.rows[0].stock_quantity;
    const newStock = previousStock + parseInt(quantity);
    
    // Update product stock
    await client.query('UPDATE products SET stock_quantity = $1 WHERE id = $2', [newStock, product_id]);
    
    // Record transaction
    const transactionResult = await client.query(
      `INSERT INTO stock_transactions (product_id, transaction_type, quantity, previous_stock, new_stock, reference_note, created_by) 
       VALUES ($1, 'stock_in', $2, $3, $4, $5, $6) RETURNING *`,
      [product_id, quantity, previousStock, newStock, reference_note, created_by]
    );
    
    await client.query('COMMIT');
    res.status(201).json({ success: true, data: transactionResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  } finally {
    client.release();
  }
};
