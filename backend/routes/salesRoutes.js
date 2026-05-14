import express from 'express';
import { getSales, createSale } from '../controllers/salesController.js';

const router = express.Router();

router.route('/')
  .get(getSales)
  .post(createSale);

export default router;
