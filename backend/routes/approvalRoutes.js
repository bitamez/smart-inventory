import express from 'express';
import { getApprovals, processApproval } from '../controllers/approvalController.js';

const router = express.Router();

router.route('/')
  .get(getApprovals);

router.route('/:id/process')
  .put(processApproval);

export default router;
