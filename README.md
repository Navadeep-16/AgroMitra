# 🌾 AgroMitra — Smart Agriculture & Local Agri-Commerce Platform

> **“Smart Farming. Better Decisions. Stronger Harvests.”**  
> *Alternative Tagline: “Everything a Farmer Needs, in One Place.”*

---

## 🌟 Overview

**AgroMitra** is a comprehensive, production-quality agricultural technology ecosystem designed to empower farmers with digital farm parcel management, computer-vision plant pathology, AI crop suitability recommendations, hyper-local weather alerts, mandi market prices, and a verified neighborhood agro-input marketplace.

---

## 🚀 Key Modules & Capabilities

### 🚜 1. Farmer Cockpit & Land Management
- **Digital Farm Map & Parcel Zones**: Interactive visual farm boundary mapper with toggleable layers for **Zone Boundaries**, **NDVI Vegetation Biomass (0.82 High)**, and **Soil Moisture Heatmap (68%)**.
- **6-Stage Crop Phenology**: Dynamic lifecycle progression (*Sowing ➔ Germination ➔ Vegetative Growth ➔ Flowering & Squares ➔ Boll Formation ➔ Harvest*) with target yield projections.
- **Soil Health Card (SHC)**: Diagnostic N-P-K nutrient gauges, soil pH, organic carbon %, and year-over-year comparison (**2025 vs 2026**).
- **Farming Calendar**: Timeline of agricultural tasks with SMS/in-app alert reminders.
- **Expense Tracker & P&L Calculator**: Categorized farm expenses, cost-per-acre analysis, and interactive yield & revenue projector.
- **Crop Rotation Planner**: Agronomic recommendations for nitrogen-fixing legume rotation (Bengal Gram / Groundnut) to break pest cycles.
- **Mandi Market Prices**: Real-time modal rates (Cotton, Chilli, Paddy, Maize, Groundnut) from regional APMC market yards with 24-hour trends.

### 🧠 2. Agronomic AI & Intelligence Services
- **Smart Crop Recommendation Engine**: Multi-variable machine learning evaluator balancing Nitrogen, Phosphorus, Potassium, Soil pH, rainfall, temperature, humidity, season, and irrigation.
- **Computer Vision Plant Disease Scanner**: Deep learning leaf diagnostic scanner with 5 pre-calibrated real leaf samples (*Cotton Leaf Curl Virus, Tomato Early Blight, Paddy Blast, Chilli Anthracnose, and Healthy Cotton*) featuring symptom breakdown, organic remedies, cultural practices, safety cautions, and 1-click Krishi Vigyan Kendra escalation.
- **AgroMitra AI Assistant**: ChatGPT-style agricultural conversational companion supporting voice input (Web Speech API) and bilingual guidance.

### 🏪 3. Local Agro-Input Marketplace & Shop Owner Console
- **Verified Product Catalog**: Certified seeds, water-soluble fertilizers (NPK 19:19:19, DAP), bio-pesticides, and farm accessories.
- **Batch Management & QR Verification**: Cryptographic token generation for seed packets and fertilizer bags to combat counterfeiting.
- **Order Fulfillment Pipeline**: Real-time order tracking (*Placed ➔ Confirmed ➔ Packed ➔ Ready for Pickup / Dispatched ➔ Delivered*).
- **GST Tax Invoice Generator**: Automatic tax invoice generation with CGST/SGST calculations.
- **Local Shop Radial Finder**: Directory of nearby licensed agro-input shops with GPS distances and contact options.

### 👨‍🔬 4. Krishi Vigyan Kendra (KVK) Expert Portal
- Review pending field queries with uploaded specimen leaf photography.
- Issue official agronomic diagnosis, intervention protocols, and long-term preventive guidance.

### 🛡 5. System Administrator Control
- Complete platform governance, user role management, shop licensing verification, and emergency broadcast center.

### 🌐 6. Centralized Internationalization (i18n)
- Native support for **English (🇬🇧)** and **Telugu (🇮🇳 తెలుగు)** across all dashboards, navigation, crop names, disease symptoms, and market data.

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **State & Storage**: Modular LocalStorage Database Engine with full CRUD persistence
- **Backend Architecture**: Enterprise Java Spring Boot 3 + JWT Modular Architecture (`backend/SPRING_BOOT_ARCHITECTURE.md`)
- **Database Schema**: 37-Entity Normalized PostgreSQL Schema (`backend/schema.sql`)
- **AI Microservice**: Python + FastAPI Service Blueprint (`ai_service/main.py`)

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/Navadeep-16/AgroMitra.git
cd AgroMitra

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npx vite preview --port 4173
```

---

## 👥 1-Click Role Sandbox

You can test all four personas using the quick role switcher in the top navigation bar:
1. **Farmer**: Ramesh Kumar (Cotton & Chilli cultivator, Warangal)
2. **Shop Owner**: Kishore Reddy (Sri Balaji Agro Agencies)
3. **Agronomy Expert**: Dr. K. Srinivas Rao, Ph.D. (Krishi Vigyan Kendra)
4. **Platform Admin**: System Administrator

---

## 📜 License & Disclaimers

AgroMitra provides diagnostic assessments and agronomic recommendations for educational and decision-support purposes. Actual yields depend on field management and weather. For registered chemical pesticides, always adhere to statutory packaging labels and local agricultural officer recommendations.
