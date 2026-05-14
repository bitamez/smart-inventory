-- =========================================
-- INVENTORY & SALES MANAGEMENT SYSTEM
-- FULL SUPABASE POSTGRESQL DATABASE SCHEMA
-- =========================================

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- 1. ROLES TABLE
-- =========================================
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO roles (role_name, description) VALUES
('Admin', 'Full system access'),
('Manager', 'Approves large sales and views reports'),
('Sales Officer', 'Processes sales transactions');

-- =========================================
-- 2. PROFILES TABLE (linked to Supabase auth.users)
-- =========================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role_id UUID REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 3. VAT SETTINGS TABLE
-- =========================================
CREATE TABLE vat_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vat_percentage NUMERIC(5,2) NOT NULL DEFAULT 15.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO vat_settings (vat_percentage) VALUES (15.00);

-- =========================================
-- 4. PRODUCTS TABLE
-- =========================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    minimum_stock_level INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 5. STOCK TRANSACTIONS TABLE
-- =========================================
CREATE TABLE stock_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL CHECK (
        transaction_type IN ('stock_in', 'stock_out', 'adjustment')
    ),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    previous_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL CHECK (new_stock >= 0),
    reference_note TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 6. SALES TABLE
-- =========================================
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(150),
    subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
    discount_percentage NUMERIC(5,2) DEFAULT 0 CHECK (
        discount_percentage >= 0 AND discount_percentage <= 100
    ),
    discount_amount NUMERIC(12,2) DEFAULT 0,
    taxable_amount NUMERIC(12,2) NOT NULL,
    vat_percentage NUMERIC(5,2) NOT NULL,
    vat_amount NUMERIC(12,2) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' CHECK (
        status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')
    ),
    requires_approval BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 7. SALE ITEMS TABLE
-- =========================================
CREATE TABLE sale_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    discount_percentage NUMERIC(5,2) DEFAULT 0 CHECK (
        discount_percentage >= 0 AND discount_percentage <= 100
    ),
    subtotal NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 8. APPROVALS TABLE
-- =========================================
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sale_id UUID UNIQUE NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    requested_by UUID REFERENCES profiles(id),
    approved_by UUID REFERENCES profiles(id),
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (
        approval_status IN ('pending', 'approved', 'rejected')
    ),
    manager_comment TEXT,
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 9. REPORTS TABLE
-- =========================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_type VARCHAR(50) NOT NULL CHECK (
        report_type IN ('daily_sales', 'monthly_sales', 'stock_report')
    ),
    generated_by UUID REFERENCES profiles(id),
    file_url TEXT,
    generated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- 10. FUNCTION: AUTO UPDATE TIMESTAMP
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_updated_at
BEFORE UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- 11. FUNCTION: PROCESS SALE
-- =========================================
CREATE OR REPLACE FUNCTION process_sale_item_stock()
RETURNS TRIGGER AS $$
DECLARE
    current_stock INTEGER;
BEGIN
    SELECT stock_quantity INTO current_stock
    FROM products
    WHERE id = NEW.product_id;

    IF current_stock < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient stock for product ID: %', NEW.product_id;
    END IF;

    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;

    INSERT INTO stock_transactions (
        product_id,
        transaction_type,
        quantity,
        previous_stock,
        new_stock,
        reference_note
    )
    VALUES (
        NEW.product_id,
        'stock_out',
        NEW.quantity,
        current_stock,
        current_stock - NEW.quantity,
        'Sale Transaction'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reduce_stock_after_sale
AFTER INSERT ON sale_items
FOR EACH ROW
EXECUTE FUNCTION process_sale_item_stock();

-- =========================================
-- 12. FUNCTION: LARGE TRANSACTION APPROVAL
-- =========================================
CREATE OR REPLACE FUNCTION check_large_sale()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.total_amount > 50000 THEN
        NEW.requires_approval = TRUE;
        NEW.status = 'pending';
    ELSE
        NEW.requires_approval = FALSE;
        NEW.status = 'completed';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_large_sale_check
BEFORE INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION check_large_sale();

-- =========================================
-- 13. REPORTING VIEWS
-- =========================================
CREATE VIEW daily_sales_report AS
SELECT
    DATE(created_at) AS sale_date,
    COUNT(*) AS total_transactions,
    SUM(total_amount) AS total_sales
FROM sales
WHERE status = 'completed'
GROUP BY DATE(created_at);

CREATE VIEW monthly_sales_report AS
SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS total_transactions,
    SUM(total_amount) AS total_sales
FROM sales
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', created_at);

CREATE VIEW stock_report AS
SELECT
    sku,
    product_name,
    stock_quantity,
    minimum_stock_level,
    CASE
        WHEN stock_quantity <= minimum_stock_level THEN 'Low Stock'
        ELSE 'Normal'
    END AS stock_status
FROM products;

-- =========================================
-- 14. INDEXES
-- =========================================
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name ON products(product_name);
CREATE INDEX idx_sales_date ON sales(created_at);
CREATE INDEX idx_sales_status ON sales(status);

-- =========================================
-- 15. ROW LEVEL SECURITY (Optional)
-- =========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Example policy
CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
USING (auth.uid() = id);

-- =========================================
-- END OF FULL SCHEMA
-- =========================================
