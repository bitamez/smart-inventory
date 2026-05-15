import { supabase, handleError } from './api'

export const stockService = {
  async getStockTransactions() {
    try {
      const { data, error } = await supabase
        .from('stock_transactions')
        .select('*, products(*), profiles(*)')
        .order('created_at', { ascending: false })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async createStockTransaction(transactionData) {
    try {
      const { data, error } = await supabase
        .from('stock_transactions')
        .insert([transactionData])
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getProductStockHistory(productId) {
    try {
      const { data, error } = await supabase
        .from('stock_transactions')
        .select('*, profiles(*)')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }
}
