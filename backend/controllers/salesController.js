import pool from '../config/db.js';

// Get all sales
export const getSales = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sales ORDER BY created_at DESC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new sale
export const createSale = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { invoice_number, customer_name, subtotal, tax_amount, total_amount, items, created_by } = req.body;
    
    // Insert into sales table
    const saleResult = await client.query(
      `INSERT INTO sales (invoice_number, customer_name, subtotal, taxable_amount, vat_percentage, vat_amount, total_amount, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [invoice_number, customer_name, subtotal, subtotal, 15, tax_amount, total_amount, created_by]
    );
    
    const newSale = saleResult.rows[0];

    // Insert sale items
    for (const item of items) {
      await client.query(
        `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) 
         VALUES ($1, $2, $3, $4, $5)`,
        [newSale.id, item.product_id, item.quantity, item.unit_price, item.quantity * item.unit_price]
      );
    }
    
    await client.query('COMMIT');
    res.status(201).json({ success: true, data: newSale });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  } finally {
    client.release();
  }
};
