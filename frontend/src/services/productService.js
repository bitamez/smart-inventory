import { supabase, handleError } from './api'

export const productService = {
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getProduct(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async createProduct(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async updateProduct(id, productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      if (error) throw error
      return { error: null }
    } catch (error) {
      return handleError(error)
    }
  },

  async getLowStockProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .lt('quantity', supabase.raw('minimum_stock_level'))
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return handleError(error)
    }
  }
}
