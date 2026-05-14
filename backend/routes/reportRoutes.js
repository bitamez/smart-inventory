import express from 'express';
import { getDailySales, getMonthlySales, getStockReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/daily', getDailySales);
router.get('/monthly', getMonthlySales);
router.get('/stock', getStockReport);

export default router;
