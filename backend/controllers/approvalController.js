import pool from '../config/db.js';

// Get all approvals
export const getApprovals = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, s.invoice_number, s.total_amount, p.full_name as requested_by_name
      FROM approvals a
      JOIN sales s ON a.sale_id = s.id
      LEFT JOIN profiles p ON a.requested_by = p.id
      ORDER BY a.created_at DESC
    `);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Process an approval (Approve or Reject)
export const processApproval = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id } = req.params;
    const { status, manager_comment, approved_by } = req.body; // status: 'approved' or 'rejected'
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Update approval record
    const approvalResult = await client.query(
      `UPDATE approvals 
       SET approval_status = $1, manager_comment = $2, approved_by = $3, approved_at = NOW()
       WHERE id = $4 RETURNING *`,
      [status, manager_comment, approved_by, id]
    );

    if (approvalResult.rows.length === 0) {
      throw new Error('Approval record not found');
    }

    const saleId = approvalResult.rows[0].sale_id;

    // Update associated sale status
    const saleStatus = status === 'approved' ? 'completed' : 'rejected';
    await client.query(
      `UPDATE sales SET status = $1 WHERE id = $2`,
      [saleStatus, saleId]
    );

    await client.query('COMMIT');
    res.status(200).json({ success: true, data: approvalResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  } finally {
    client.release();
  }
};
