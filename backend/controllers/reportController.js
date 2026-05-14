import pool from '../config/db.js';

// Get Daily Sales Report
export const getDailySales = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM daily_sales_report ORDER BY sale_date DESC LIMIT 30');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get Monthly Sales Report
export const getMonthlySales = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM monthly_sales_report ORDER BY month DESC LIMIT 12');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get Stock Report
export const getStockReport = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stock_report ORDER BY stock_quantity ASC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
