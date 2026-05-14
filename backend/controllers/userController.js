import pool from '../config/db.js';

// Get all users (profiles)
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, r.role_name 
      FROM profiles p
      LEFT JOIN roles r ON p.role_id = r.id
      ORDER BY p.created_at DESC
    `);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, r.role_name FROM profiles p LEFT JOIN roles r ON p.role_id = r.id WHERE p.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Update a user profile (e.g. role or active status)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, role_id, is_active } = req.body;

    const result = await pool.query(
      `UPDATE profiles SET 
        full_name = COALESCE($1, full_name),
        role_id = COALESCE($2, role_id),
        is_active = COALESCE($3, is_active)
       WHERE id = $4 RETURNING *`,
      [full_name, role_id, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Deactivate a user (soft delete)
export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE profiles SET is_active = false WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
