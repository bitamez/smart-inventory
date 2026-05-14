import pool from '../config/db.js';

// Daily sales summary
export const getDailyReportService = async () => {
  const result = await pool.query(
    `SELECT DATE(created_at) as sale_date,
            COUNT(*) as total_sales,
            SUM(total_amount) as total_revenue,
            SUM(vat_amount) as total_vat,
            SUM(discount_amount) as total_discounts
     FROM sales WHERE status = 'completed'
     GROUP BY DATE(created_at)
     ORDER BY sale_date DESC
     LIMIT 30`
  );
  return result.rows;
};

// Monthly sales summary
export const getMonthlyReportService = async () => {
  const result = await pool.query(
    `SELECT TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') as month,
            COUNT(*) as total_sales,
            SUM(total_amount) as total_revenue,
            SUM(vat_amount) as total_vat,
            SUM(discount_amount) as total_discounts
     FROM sales WHERE status = 'completed'
     GROUP BY DATE_TRUNC('month', created_at)
     ORDER BY DATE_TRUNC('month', created_at) DESC
     LIMIT 12`
  );
  return result.rows;
};

// Stock level report
export const getStockReportService = async () => {
  const result = await pool.query(
    `SELECT id, sku, product_name, category, stock_quantity, minimum_stock, unit_price,
            (stock_quantity * unit_price) as stock_value,
            CASE WHEN stock_quantity <= minimum_stock THEN 'low_stock' ELSE 'in_stock' END as stock_status
     FROM products
     ORDER BY stock_quantity ASC`
  );
  return result.rows;
};
