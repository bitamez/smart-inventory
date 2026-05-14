import { addStockService, getAllStockService } from '../services/stockService.js';

// Get all stock transactions
export const getStockTransactions = async (req, res) => {
  try {
    const data = await getAllStockService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add stock transaction
export const addStock = async (req, res) => {
  try {
    const performed_by = req.user?.id;
    const data = await addStockService({ ...req.body, performed_by });
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
