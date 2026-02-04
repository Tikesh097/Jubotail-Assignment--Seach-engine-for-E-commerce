# 🔍 E-Commerce Search Engine Microservice

A backend microservice implementing an intelligent search and ranking system for an electronics e-commerce platform targeting Tier-2 and Tier-3 cities in India.

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)


---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Data Model](#-data-model)
- [Query Understanding](#-query-understanding)
- [Ranking Algorithm](#-ranking-algorithm)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Usage Examples](#-usage-examples)
- [Performance](#-performance)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This microservice provides intelligent product search and ranking capabilities for an e-commerce platform specializing in electronics (mobile phones, laptops, accessories, headphones, etc.). The system is designed to understand real-world customer behavior in Indian markets, including:

- **Hinglish queries** – *"Sasta iPhone"*, *"Accha headphone"*
- **Spelling variations** – *"Ifone 16"*, *"Samsang mobile"*
- **Budget constraints** – *"iPhone 50k"*, *"laptop under 40000"*
- **Attribute filters** – *"iPhone red 128GB"*, *"5000mAh battery phone"*


## ✨ Key Features

### 🧠 Intelligent Query Processing
- **Hinglish Support** – Understands common Hindi-English mixed queries
- **Fuzzy Matching** – Handles typos and spelling variations
- **Intent Detection** – Recognizes budget, preference, and attribute queries
- **Multi-criteria Search** – Combines text, price, and metadata filtering

### 📊 Smart Ranking System
- **Weighted Scoring** – Balances relevance, ratings, price, and popularity
- **Business Metrics** – Considers return rates and customer complaints
- **Stock Awareness** – Deprioritizes out-of-stock items
- **Context-Aware** – Adjusts ranking based on query intent

### 🚀 Production-Ready Design
- **Modular Architecture** – Clean separation of concerns
- **RESTful APIs** – Standard HTTP endpoints
- **Fast Response** – In-memory data access for low latency
- **Scalable Foundation** – Easy to extend with databases

---

## 🏗 Architecture

```
┌─────────────────┐
│   API Layer     │  ← Express.js Routes
├─────────────────┤
│ Business Logic  │  ← Search & Ranking Services
├─────────────────┤
│ Data Access     │  ← In-Memory Product Store
├─────────────────┤
│    Utils        │  ← Query Normalization & Helpers
└─────────────────┘
```

### Technology Stack

- **Runtime:** Node.js (v16+)
- **Framework:** Express.js
- **Data Storage:** In-memory (for this implementation)
- **Architecture Pattern:** Service-Oriented Design

---

## 📁 Project Structure

```
ecommerce-search-engine/
│
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── .gitignore                   # Git ignore rules
│
└── src/
    ├── server.js                # Server entry point
    ├── app.js                   # Express app configuration
    │
    ├── routes/
    │   ├── product.routes.js    # Product management endpoints
    │   └── search.routes.js     # Search endpoints
    │
    ├── services/
    │   ├── product.service.js   # Product business logic
    │   └── ranking.service.js   # Search ranking algorithm
    │
    ├── utils/
    │   ├── queryNormalizer.js   # Query preprocessing
    │   └── dummyData.js         # Sample product data
    │
    └── data/
        └── productStore.js      # In-memory data store
```

---


## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api/v1
```

### 1️⃣ Store Product

**Endpoint:** `POST /product`

**Description:** Add a new product to the catalog

**Request Body:**
```json
{
  "title": "iPhone 16",
  "description": "Latest iPhone with A18 chip",
  "price": 59000,
  "category": "mobile",
  "brand": "Apple",
  "rating": 4.6,
  "stock": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product stored successfully",
  "productId": "p001"
}
```

---

### 2️⃣ Update Product Metadata

**Endpoint:** `PUT /product/meta-data`

**Description:** Add or update technical specifications

**Request Body:**
```json
{
  "productId": "p001",
  "metadata": {
    "storage": "128GB",
    "color": "black",
    "ram": "8GB"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Metadata updated successfully"
}
```

---

### 3️⃣ Search Products

**Endpoint:** `GET /search/product?query={searchQuery}`

**Description:** Search and rank products

**Query Parameters:**
- `query` (required): Search query string
- `limit` (optional): Number of results (default: 20)

**Example Request:**
```
GET /search/product?query=Sasta%20iPhone&limit=10
```

**Response:**
```json
{
  "success": true,
  "query": "Sasta iPhone",
  "results": 10,
  "products": [
    {
      "id": "p003",
      "title": "iPhone 13",
      "price": 45000,
      "rating": 4.5,
      "score": 82.5,
      "relevance": "high"
    },
    // ... more products
  ]
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-search-engine
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

4. **Verify installation**
```bash
curl http://localhost:8080/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 💡 Usage Examples

### Example 1: Budget Search
```bash
curl "http://localhost:8080/api/v1/search/product?query=iPhone%2050k"
```

Returns iPhones priced under ₹50,000, ranked by value.

---

### Example 2: Hinglish Query
```bash
curl "http://localhost:8080/api/v1/search/product?query=Sasta%20laptop"
```

Returns affordable laptops, prioritizing lower prices.

---

### Example 3: Attribute Filter
```bash
curl "http://localhost:8080/api/v1/search/product?query=iPhone%20red%20128GB"
```

Returns iPhones matching color and storage specifications.

---

### Example 4: Spelling Correction
```bash
curl "http://localhost:8080/api/v1/search/product?query=Ifone%2016"
```

Automatically corrects to "iPhone 16" and returns results.

---


## 🔮 Future Enhancements

### Phase 1: Database Integration
- [ ] MongoDB for persistent storage
- [ ] Elasticsearch for full-text search
- [ ] Redis for caching

### Phase 2: Advanced Features
- [ ] User behavior tracking
- [ ] Personalized recommendations
- [ ] A/B testing for ranking algorithms
- [ ] Machine learning-based ranking

### Phase 3: Scale & Performance
- [ ] Horizontal scaling with load balancers
- [ ] CDN integration for static content
- [ ] GraphQL API support
- [ ] Real-time analytics dashboard

### Phase 4: Intelligence
- [ ] LLM-based query understanding
- [ ] Image-based search
- [ ] Voice search support
- [ ] Multilingual support (Hindi, Tamil, Telugu)

---


## 🙏 Acknowledgments

- **Assignment Guidelines:** For encouraging LLM-assisted development
- **Indian E-Commerce Insights:** Real-world search behavior patterns
- **Open Source Community:** For tools and frameworks

---

## 📧 Contact

For questions, feedback, or collaboration:

- **GitHub Issues:** [Create an issue](../../issues)
- **Email:** aswaletinku@gmail.com

---

## 📊 Project Status

- ✅ Core search functionality
- ✅ Ranking algorithm
- ✅ API endpoints
- ✅ Query normalization
- 🚧 Database integration (planned)
- 🚧 ML-based ranking (planned)

---

<div align="center">

**Built with ❤️ for Indian E-Commerce**

⭐ Star this repo if you find it useful!

</div>