import { getAllApprovalsService, processApprovalService } from '../services/approvalService.js';

// Get all approvals
export const getApprovals = async (req, res) => {
  try {
    const data = await getAllApprovalsService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve or reject a sale
export const processApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, notes } = req.body;
    const approved_by = req.user?.id;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Action must be "approve" or "reject"' });
    }

    const data = await processApprovalService({ approval_id: id, action, approved_by, notes });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
