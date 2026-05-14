import { createSaleService, getAllSalesService } from '../services/salesService.js';
import pool from '../config/db.js';

// Get all sales
export const getSales = async (req, res) => {
  try {
    const data = await getAllSalesService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single sale with items
export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    if (!sale.rows.length) return res.status(404).json({ success: false, message: 'Sale not found' });
    const items = await pool.query(
      `SELECT si.*, p.product_name, p.sku FROM sale_items si JOIN products p ON si.product_id = p.id WHERE si.sale_id = $1`,
      [id]
    );
    res.status(200).json({ success: true, data: { ...sale.rows[0], items: items.rows } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new sale
export const createSale = async (req, res) => {
  try {
    const sellerId = req.user?.id;
    const data = await createSaleService({ ...req.body, seller_id: sellerId });
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
