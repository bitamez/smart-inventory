import { getDailyReportService, getMonthlyReportService, getStockReportService } from '../services/reportService.js';

// Get Daily Sales Report
export const getDailySales = async (req, res) => {
  try {
    const data = await getDailyReportService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Monthly Sales Report
export const getMonthlySales = async (req, res) => {
  try {
    const data = await getMonthlyReportService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Stock Level Report
export const getStockReport = async (req, res) => {
  try {
    const data = await getStockReportService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
