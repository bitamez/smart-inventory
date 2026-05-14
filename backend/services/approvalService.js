import pool from '../config/db.js';

// Process an approval decision (approve or reject)
export const processApprovalService = async ({ approval_id, action, approved_by, notes }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const approval = await client.query('SELECT * FROM approvals WHERE id = $1 FOR UPDATE', [approval_id]);
    if (!approval.rows.length) throw new Error('Approval not found');
    if (approval.rows[0].status !== 'pending') throw new Error('Approval already processed');

    const newApprovalStatus = action === 'approve' ? 'approved' : 'rejected';
    const newSaleStatus = action === 'approve' ? 'completed' : 'rejected';

    await client.query(
      `UPDATE approvals SET status=$1, approved_by=$2, notes=$3, processed_at=NOW() WHERE id=$4`,
      [newApprovalStatus, approved_by, notes, approval_id]
    );

    await client.query(
      `UPDATE sales SET status=$1 WHERE id=$2`,
      [newSaleStatus, approval.rows[0].sale_id]
    );

    // If rejected, restore the stock
    if (action === 'reject') {
      const items = await client.query('SELECT * FROM sale_items WHERE sale_id = $1', [approval.rows[0].sale_id]);
      for (const item of items.rows) {
        await client.query('UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2', [item.quantity, item.product_id]);
      }
    }

    await client.query('COMMIT');
    return { success: true, action };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Get all approvals
export const getAllApprovalsService = async () => {
  const result = await pool.query(
    `SELECT a.*, s.invoice_number, s.total_amount, s.customer_name,
            p.full_name as requested_by_name, ap.full_name as approved_by_name
     FROM approvals a
     LEFT JOIN sales s ON a.sale_id = s.id
     LEFT JOIN profiles p ON a.requested_by = p.id
     LEFT JOIN profiles ap ON a.approved_by = ap.id
     ORDER BY a.created_at DESC`
  );
  return result.rows;
};
