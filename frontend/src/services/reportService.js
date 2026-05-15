import { supabase, handleError } from './api'

export const reportService = {
  async getDailyReport(date) {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*, sale_items(*)')
        .gte('created_at', `${date}T00:00:00`)
        .lte('created_at', `${date}T23:59:59`)
        .eq('status', 'completed')
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getMonthlyReport(year, month) {
    try {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`
      const endDate = new Date(year, month, 0).toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('sales')
        .select('*, sale_items(*)')
        .gte('created_at', `${startDate}T00:00:00`)
        .lte('created_at', `${endDate}T23:59:59`)
        .eq('status', 'completed')
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getStockReport() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('quantity', { ascending: true })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }
}
