-- =========================================
-- SEED DATA FOR INVENTORY & SALES SYSTEM
-- =========================================

-- Seed Roles (if not already inserted from schema)
INSERT INTO roles (role_name, description) VALUES
  ('Admin', 'Full system access'),
  ('Manager', 'Approves large sales and views reports'),
  ('Sales Officer', 'Processes sales transactions')
ON CONFLICT (role_name) DO NOTHING;

-- Seed Products
INSERT INTO products (sku, product_name, category, unit_price, stock_quantity, minimum_stock, unit_of_measure, description) VALUES
  ('CEM-50KG', 'Cement 50kg Bag', 'Building Materials', 650.00, 200, 50, 'bag', 'Portland cement 50kg standard bag'),
  ('STL-12MM', 'Steel Rebar 12mm', 'Steel & Metal', 1200.00, 120, 30, 'pcs', '12mm diameter deformed steel rebar 12m'),
  ('PNT-20L-WH', 'Paint 20L White', 'Paint & Coatings', 1200.00, 45, 10, 'bucket', '20 litre white interior/exterior paint'),
  ('PVC-PIPE-4', 'PVC Pipe 4 inch', 'Plumbing', 450.00, 80, 20, 'pcs', '4 inch PVC pressure pipe 6m length'),
  ('WND-GLS-4MM', 'Window Glass 4mm', 'Glass & Glazing', 890.00, 30, 15, 'sheet', '4mm clear float window glass per sheet'),
  ('CRM-TLE-30', 'Ceramic Tiles 30x30', 'Tiles & Flooring', 320.00, 500, 100, 'pcs', 'White ceramic floor/wall tiles 30x30cm'),
  ('NAL-2IN', 'Common Nails 2 inch', 'Hardware & Fasteners', 45.00, 1500, 200, 'kg', 'Common wire nails 2 inch per kg'),
  ('WD-DOOR-STD', 'Wooden Door Standard', 'Doors & Windows', 4500.00, 25, 5, 'pcs', 'Standard wooden interior door 200x80cm'),
  ('ALU-RFG-SHT', 'Aluminum Roofing Sheet', 'Roofing', 850.00, 150, 30, 'sheet', 'Corrugated aluminum roofing sheet 3m'),
  ('PLY-WD-12MM', 'Plywood 12mm', 'Wood & Timber', 750.00, 60, 15, 'sheet', '12mm hardwood plywood sheet 4x8ft')
ON CONFLICT (sku) DO NOTHING;
