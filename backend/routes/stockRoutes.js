import express from 'express';
import { getStockTransactions, addStock } from '../controllers/stockController.js';

const router = express.Router();

router.route('/')
  .get(getStockTransactions)
  .post(addStock);

export default router;
