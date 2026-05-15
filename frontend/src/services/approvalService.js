import { supabase, handleError } from './api'

export const approvalService = {
  async getPendingApprovals() {
    try {
      const { data, error } = await supabase
        .from('approvals')
        .select('*, sales(*, sale_items(*, products(*)), profiles(*))')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async approveRequest(approvalId, managerId) {
    try {
      const { data, error } = await supabase
        .from('approvals')
        .update({
          status: 'approved',
          approved_by: managerId,
          approved_at: new Date().toISOString()
        })
        .eq('id', approvalId)
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async rejectRequest(approvalId, managerId) {
    try {
      const { data, error } = await supabase
        .from('approvals')
        .update({
          status: 'rejected',
          approved_by: managerId,
          approved_at: new Date().toISOString()
        })
        .eq('id', approvalId)
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }
}
