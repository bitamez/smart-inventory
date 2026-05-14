import pool from '../config/db.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { sku, product_name, description, category, unit_price, stock_quantity, minimum_stock_level, created_by } = req.body;
    
    const newProduct = await pool.query(
      `INSERT INTO products (sku, product_name, description, category, unit_price, stock_quantity, minimum_stock_level, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [sku, product_name, description, category, unit_price, stock_quantity, minimum_stock_level, created_by]
    );
    
    res.status(201).json({ success: true, data: newProduct.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, product_name, description, category, unit_price, stock_quantity, minimum_stock_level, is_active } = req.body;
    
    const updatedProduct = await pool.query(
      `UPDATE products 
       SET sku = COALESCE($1, sku), 
           product_name = COALESCE($2, product_name), 
           description = COALESCE($3, description), 
           category = COALESCE($4, category), 
           unit_price = COALESCE($5, unit_price), 
           stock_quantity = COALESCE($6, stock_quantity), 
           minimum_stock_level = COALESCE($7, minimum_stock_level),
           is_active = COALESCE($8, is_active)
       WHERE id = $9 RETURNING *`,
      [sku, product_name, description, category, unit_price, stock_quantity, minimum_stock_level, is_active, id]
    );
    
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: updatedProduct.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (deleteProduct.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
