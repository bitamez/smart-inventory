import { supabase, handleError } from './api'

export const salesService = {
  async getSales() {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*, sale_items(*, products(*)), profiles(*)')
        .order('created_at', { ascending: false })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getSale(id) {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*, sale_items(*, products(*)), profiles(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async createSale(saleData) {
    try {
      const { data, error } = await supabase
        .from('sales')
        .insert([saleData])
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async createSaleItems(saleItems) {
    try {
      const { data, error } = await supabase
        .from('sale_items')
        .insert(saleItems)
        .select()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getVATSettings() {
    try {
      const { data, error } = await supabase
        .from('vat_settings')
        .select('*')
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }
}
