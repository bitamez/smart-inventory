import pool from '../config/db.js';
import { generateInvoiceNumber } from '../utils/generateInvoice.js';

// Create a new sale with items inside a transaction
export const createSaleService = async ({ customer_name, seller_id, discount_percentage = 0, vat_percentage = 15, items }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const invoice_number = await generateInvoiceNumber(pool);
    let subtotal = 0;

    // Validate stock and compute subtotal
    for (const item of items) {
      const product = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [item.product_id]);
      if (!product.rows.length) throw new Error(`Product ${item.product_id} not found`);
      if (product.rows[0].stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.rows[0].product_name}`);
      }
      subtotal += item.unit_price * item.quantity;
    }

    const discount_amount = (subtotal * discount_percentage) / 100;
    const discounted = subtotal - discount_amount;
    const vat_amount = (discounted * vat_percentage) / 100;
    const total_amount = discounted + vat_amount;
    const requires_approval = total_amount > 50000;
    const status = requires_approval ? 'pending_approval' : 'completed';

    // Insert sale
    const sale = await client.query(
      `INSERT INTO sales (invoice_number, customer_name, seller_id, subtotal, discount_percentage, discount_amount, vat_percentage, vat_amount, total_amount, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [invoice_number, customer_name, seller_id, subtotal, discount_percentage, discount_amount, vat_percentage, vat_amount, total_amount, status]
    );
    const sale_id = sale.rows[0].id;

    // Insert sale items and deduct stock
    for (const item of items) {
      const line_total = item.unit_price * item.quantity;
      await client.query(
        `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, line_total) VALUES ($1,$2,$3,$4,$5)`,
        [sale_id, item.product_id, item.quantity, item.unit_price, line_total]
      );
      await client.query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
        [item.quantity, item.product_id]
      );
      await client.query(
        `INSERT INTO stock_transactions (product_id, transaction_type, quantity, reference_id, notes) VALUES ($1,'stock_out',$2,$3,'Sold via invoice')`,
        [item.product_id, item.quantity, sale_id]
      );
    }

    // Create approval if needed
    if (requires_approval) {
      await client.query(
        `INSERT INTO approvals (sale_id, requested_by, status) VALUES ($1,$2,'pending')`,
        [sale_id, seller_id]
      );
    }

    await client.query('COMMIT');
    return sale.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Get all sales with seller info
export const getAllSalesService = async () => {
  const result = await pool.query(
    `SELECT s.*, p.full_name as seller_name FROM sales s LEFT JOIN profiles p ON s.seller_id = p.id ORDER BY s.created_at DESC`
  );
  return result.rows;
};
