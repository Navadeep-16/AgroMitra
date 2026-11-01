-- ==============================================================================
-- AGROMITRA DATABASE SCHEMA (PostgreSQL / Relational)
-- Production Quality Normalized DDL
-- Covers all 37 Core Domain Entities with Constraints, Foreign Keys & Indexes
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 2. USER & AUTHENTICATION
CREATE TYPE user_role_enum AS ENUM ('FARMER', 'SHOP_OWNER', 'EXPERT', 'ADMIN');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'FARMER',
    avatar_url VARCHAR(500),
    preferred_language VARCHAR(10) NOT NULL DEFAULT 'en',
    location VARCHAR(200) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL DEFAULT 'Telangana',
    pincode VARCHAR(10),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 3. PROFILES
CREATE TABLE farmer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_acreage NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    kisan_credit_card_no VARCHAR(50),
    soil_health_card_id VARCHAR(50),
    primary_crops TEXT[] DEFAULT '{}',
    is_bank_account_linked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    shop_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(120) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    gstin VARCHAR(20) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    email CITEXT,
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    is_open BOOLEAN NOT NULL DEFAULT TRUE,
    opening_hours VARCHAR(100) NOT NULL DEFAULT '8:00 AM - 8:00 PM',
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INT DEFAULT 0,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    pickup_available BOOLEAN NOT NULL DEFAULT TRUE,
    home_delivery_available BOOLEAN NOT NULL DEFAULT FALSE,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expert_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialization VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL DEFAULT 1,
    consultations_completed INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    available_for_consultation BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. FARMS & PARCEL ZONES
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(150) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    total_acres NUMERIC(6, 2) NOT NULL CHECK (total_acres > 0),
    soil_type VARCHAR(50) NOT NULL,
    irrigation_type VARCHAR(50) NOT NULL,
    water_source VARCHAR(100) NOT NULL,
    current_crop VARCHAR(100),
    crop_variety VARCHAR(100),
    sowing_date DATE,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    boundary_geojson JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE farm_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    zone_name VARCHAR(50) NOT NULL,
    acres NUMERIC(6, 2) NOT NULL CHECK (acres > 0),
    crop_name VARCHAR(100) NOT NULL,
    crop_variety VARCHAR(100) NOT NULL,
    polygon_geojson JSONB,
    color_hex VARCHAR(10) DEFAULT '#2E7D32',
    soil_moisture_percent NUMERIC(5, 2) DEFAULT 60.00,
    health_index VARCHAR(30) DEFAULT 'Optimal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CROPS & ACTIVITIES
CREATE TABLE crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    name_te VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150),
    category VARCHAR(50) NOT NULL,
    average_duration_days INT NOT NULL,
    water_requirement VARCHAR(30) NOT NULL
);

CREATE TABLE crop_varieties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    variety_name VARCHAR(120) NOT NULL,
    breeder_company VARCHAR(150) NOT NULL,
    duration_days INT NOT NULL,
    optimal_soil VARCHAR(100),
    tolerance_characteristics TEXT
);

CREATE TABLE farm_crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    crop_id UUID REFERENCES crops(id),
    crop_name VARCHAR(100) NOT NULL,
    crop_name_te VARCHAR(100),
    variety VARCHAR(120) NOT NULL,
    sowing_date DATE NOT NULL,
    estimated_harvest_date DATE,
    acres NUMERIC(6, 2) NOT NULL,
    current_stage VARCHAR(50) NOT NULL DEFAULT 'Sowing',
    stage_progress_percent INT NOT NULL DEFAULT 0,
    days_since_sowing INT NOT NULL DEFAULT 0,
    total_duration_days INT NOT NULL DEFAULT 140,
    health_status VARCHAR(30) DEFAULT 'Good',
    target_yield_quintals NUMERIC(6, 2),
    actual_yield_quintals NUMERIC(6, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crop_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_id UUID NOT NULL REFERENCES farm_crops(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    title_te VARCHAR(200),
    scheduled_day INT NOT NULL,
    due_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. SOIL & WEATHER RECORDS
CREATE TABLE soil_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    sample_date DATE NOT NULL,
    report_year INT NOT NULL,
    ph NUMERIC(4, 2) NOT NULL CHECK (ph >= 0 AND ph <= 14),
    nitrogen_kg_per_ha NUMERIC(6, 2) NOT NULL,
    phosphorus_kg_per_ha NUMERIC(6, 2) NOT NULL,
    potassium_kg_per_ha NUMERIC(6, 2) NOT NULL,
    organic_carbon_percent NUMERIC(4, 2) NOT NULL,
    electrical_conductivity NUMERIC(5, 2) NOT NULL,
    micronutrients JSONB DEFAULT '{}',
    recommendations TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weather_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location VARCHAR(150) NOT NULL,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    record_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    temperature_c NUMERIC(4, 1) NOT NULL,
    humidity_percent NUMERIC(4, 1) NOT NULL,
    rain_probability_percent INT NOT NULL,
    wind_speed_kmh NUMERIC(4, 1) NOT NULL,
    condition VARCHAR(50) NOT NULL
);

-- 7. PRODUCT CATALOG & INVENTORY
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon_name VARCHAR(50)
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    name_te VARCHAR(200),
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(120) NOT NULL,
    pack_size VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    mrp NUMERIC(10, 2) NOT NULL CHECK (mrp >= price),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 10,
    sku VARCHAR(100) UNIQUE NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INT DEFAULT 0,
    image_url VARCHAR(500),
    description TEXT NOT NULL,
    description_te TEXT,
    suitable_crops TEXT[] DEFAULT '{}',
    active_ingredients TEXT,
    dosage_instructions TEXT,
    safety_instructions TEXT,
    storage_instructions TEXT,
    manufacturer VARCHAR(150) NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    batch_number VARCHAR(100) NOT NULL,
    manufacturing_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    supplier_name VARCHAR(150) NOT NULL,
    purchase_price NUMERIC(10, 2) NOT NULL,
    selling_price NUMERIC(10, 2) NOT NULL,
    quantity_added INT NOT NULL CHECK (quantity_added > 0),
    quantity_remaining INT NOT NULL CHECK (quantity_remaining >= 0),
    qr_code_token VARCHAR(255) UNIQUE NOT NULL,
    is_verified_authentic BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CART & ORDERS
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES product_batches(id),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE order_status_enum AS ENUM (
    'Placed', 'Confirmed', 'Packed', 'Ready for Pickup', 'Out for Delivery', 'Delivered', 'Cancelled'
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE RESTRICT,
    subtotal NUMERIC(10, 2) NOT NULL,
    delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    delivery_type VARCHAR(30) NOT NULL DEFAULT 'Store Pickup',
    delivery_address TEXT,
    status order_status_enum NOT NULL DEFAULT 'Placed',
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    invoice_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    pack_size VARCHAR(100) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL,
    batch_number VARCHAR(100)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    transaction_ref VARCHAR(100) UNIQUE,
    payment_mode VARCHAR(50) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    subtotal NUMERIC(10, 2) NOT NULL,
    cgst NUMERIC(10, 2) NOT NULL,
    sgst NUMERIC(10, 2) NOT NULL,
    grand_total NUMERIC(10, 2) NOT NULL,
    pdf_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. FINANCES: EXPENSES & YIELDS
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    expense_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    crop_season VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE farm_yields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    crop_id UUID REFERENCES farm_crops(id),
    harvest_year INT NOT NULL,
    season VARCHAR(50) NOT NULL,
    acres NUMERIC(6, 2) NOT NULL,
    yield_quintals NUMERIC(8, 2) NOT NULL,
    selling_price_per_quintal NUMERIC(10, 2) NOT NULL,
    total_revenue NUMERIC(12, 2) NOT NULL,
    total_expenses NUMERIC(12, 2) NOT NULL,
    net_profit NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. MARKET PRICES & MANDIS
CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop VARCHAR(100) NOT NULL,
    crop_te VARCHAR(100),
    variety VARCHAR(100) NOT NULL,
    mandi VARCHAR(150) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL DEFAULT 'Telangana',
    modal_price NUMERIC(10, 2) NOT NULL,
    min_price NUMERIC(10, 2) NOT NULL,
    max_price NUMERIC(10, 2) NOT NULL,
    change_percent NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    trend VARCHAR(10) NOT NULL DEFAULT 'stable',
    source VARCHAR(150) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. EXPERT CONSULTATIONS
CREATE TABLE expert_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop VARCHAR(100) NOT NULL,
    issue_category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    image_url VARCHAR(500),
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expert_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID UNIQUE NOT NULL REFERENCES expert_questions(id) ON DELETE CASCADE,
    expert_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    diagnosis_summary TEXT NOT NULL,
    recommendations TEXT[] DEFAULT '{}',
    preventive_guidance TEXT,
    response_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. DISEASES & AI DETECTIONS
CREATE TABLE diseases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    name_te VARCHAR(150),
    scientific_name VARCHAR(150),
    affected_crops TEXT[] DEFAULT '{}',
    symptoms TEXT[] DEFAULT '{}',
    cultural_prevention TEXT[] DEFAULT '{}',
    organic_remedies TEXT[] DEFAULT '{}'
);

CREATE TABLE disease_detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    image_url VARCHAR(500) NOT NULL,
    crop_detected VARCHAR(100) NOT NULL,
    disease_name VARCHAR(150) NOT NULL,
    confidence_score NUMERIC(5, 2) NOT NULL,
    severity VARCHAR(30) NOT NULL,
    ai_model_version VARCHAR(50) DEFAULT 'v2.4',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. NOTIFICATIONS & COMMUNITY
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_te VARCHAR(200),
    message TEXT NOT NULL,
    message_te TEXT,
    action_url VARCHAR(255),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    crop_tag VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    likes_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_likes (
    post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id)
);

-- 14. SCHEMES & AUDIT LOGS
CREATE TABLE government_schemes (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_te VARCHAR(200),
    short_desc TEXT NOT NULL,
    short_desc_te TEXT,
    eligibility TEXT[] DEFAULT '{}',
    benefits TEXT NOT NULL,
    how_to_apply TEXT NOT NULL,
    official_source VARCHAR(200) NOT NULL,
    source_url VARCHAR(500) NOT NULL,
    last_updated DATE NOT NULL
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. PERFORMANCE INDEXES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_farms_farmer_id ON farms(farmer_id);
CREATE INDEX idx_products_shop_id ON products(shop_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_farmer_id ON orders(farmer_id);
CREATE INDEX idx_orders_shop_id ON orders(shop_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_product_batches_qr ON product_batches(qr_code_token);
CREATE INDEX idx_market_prices_crop ON market_prices(crop);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

