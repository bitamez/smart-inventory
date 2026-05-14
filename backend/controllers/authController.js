import { supabase } from '../config/supabase.js';
import pool from '../config/db.js';

// Register a new user via Supabase Auth + insert profile
export const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role_id } = req.body;

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const userId = data.user.id;

    // Insert profile into our profiles table
    const profile = await pool.query(
      `INSERT INTO profiles (id, full_name, email, role_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, full_name, email, role_id]
    );

    res.status(201).json({ success: true, data: profile.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Login user via Supabase Auth
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Fetch role info from profiles
    const profile = await pool.query(
      `SELECT p.*, r.role_name FROM profiles p LEFT JOIN roles r ON p.role_id = r.id WHERE p.id = $1`,
      [data.user.id]
    );

    res.status(200).json({
      success: true,
      token: data.session.access_token,
      user: {
        ...data.user,
        profile: profile.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    await supabase.auth.signOut();
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get currently logged-in user profile
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT p.*, r.role_name FROM profiles p LEFT JOIN roles r ON p.role_id = r.id WHERE p.id = $1`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
