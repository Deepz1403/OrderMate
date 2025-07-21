# OrderMate - Order Processing System

A modern order processing and inventory management system built with Next.js, TypeScript, and MongoDB.

## Features

- 📊 **Dashboard Overview** - Real-time statistics and analytics
- 👥 **Customer Management** - Add, view, and manage customers
- 📦 **Inventory Management** - Track products and stock levels
- 🛍️ **Order Processing** - Create and manage orders
- 📈 **Analytics** - Sales insights and performance metrics
- 🤖 **AI Chatbot** - Customer support assistant
- 💾 **MongoDB Integration** - Robust data storage and management

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd OrderMate

# Install dependencies
npm install
```

### 2. Environment Setup

The environment variables are already configured in `.env.local`:

### 3. Database Setup

Seed the database with sample data:

```bash
npm run seed
```

This will create:

- 3 sample customers
- 5 sample products (including some with low stock)
- 3 sample orders with different statuses

### 4. Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   └── dashboard/          # Dashboard pages
│   ├── api/                    # API routes
│   └── layout.tsx              # Root layout
├── components/
│   ├── dashboard/              # Dashboard components
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── mongodb.ts              # Database connection
│   └── utils.ts                # Utility functions
├── models/                     # MongoDB schemas
└── types/                      # TypeScript type definitions
```

## API Endpoints

- `GET /api/dashboard/stats` - Dashboard statistics
- `GET|POST /api/customers` - Customer management
- `GET|POST /api/products` - Product/inventory management
- `GET|POST /api/orders` - Order management

## Database Models

### Customer

- Personal information (name, email, phone)
- Address details
- Order history
- Total spending

### Product

- Product details (name, description, price)
- Inventory tracking (quantity, low stock alerts)
- SKU and category management

### Order

- Order items and quantities
- Customer information
- Payment and shipping details
- Order status tracking

## Features in Detail

### Dashboard

- Real-time statistics (orders, customers, revenue)
- Recent orders display
- Low stock alerts
- Quick action buttons

### Inventory Management

- Product catalog
- Stock level monitoring
- Low stock alerts
- SKU management

### Order Processing

- Create new orders
- Automatic inventory updates
- Tax calculation (18% GST)
- Multiple payment methods

### Customer Management

- Customer profiles
- Order history
- Contact information
- Spending analytics

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **Build Tools**: ESLint, PostCSS

## Development Notes

- The project uses MongoDB for data persistence
- API routes handle CRUD operations for all entities
- Real-time dashboard updates via API calls
- Responsive design for mobile and desktop
- Type-safe development with TypeScript

## Support

For any issues or questions, please check the console logs and ensure MongoDB connection is successful. The dashboard will show connection status and any critical alerts.
