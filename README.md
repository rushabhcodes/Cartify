# 🛒 Cartify - E-commerce Platform

A modern, full-stack e-commerce platform built with React (Vite), Node.js, and PostgreSQL.

## 🚀 Live Demo

- **Frontend**: [https://cartify.rushabh.dev](https://cartify.rushabh.dev)
- **Backend API**: [https://api.cartify.rushabh.dev](https://api.cartify.rushabh.dev)
- **API Documentation**: [https://api.cartify.rushabh.dev/docs](https://api.cartify.rushabh.dev/docs)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Developer](#developer)

## ✨ Features

### **User Features**
- 🔐 User authentication (register, login, logout)
- 🛍️ Product browsing and search
- 🛒 Shopping cart management (add, remove, update quantities)
- 📱 Responsive design for all devices
- 💾 Local cart storage for non-authenticated users
- 🔄 Real-time cart synchronization

### **Technical Features**
- 🎨 Modern UI with Tailwind CSS and Shadcn/UI components
- 🔒 JWT-based authentication
- 📊 RESTful API with comprehensive documentation
- 🗃️ PostgreSQL database with Prisma ORM
- ⚡ Optimistic UI updates with React Query
- 🌐 Full-stack TypeScript implementation
- 📱 Mobile-first responsive design
- ⚡ Fast development with Vite

## 🛠️ Tech Stack

### **Frontend**
- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Deployment**: Vercel

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Vercel

### **Development Tools**
- **Package Manager**: pnpm
- **Code Quality**: ESLint, TypeScript
- **Database Migrations**: Prisma
- **API Testing**: Swagger UI (development)

## 📁 Project Structure

```
Cartify/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # Shadcn/UI components
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── ...
│   │   ├── lib/            # Utilities and configurations
│   │   │   ├── api.ts      # API client setup
│   │   │   └── utils.ts
│   │   ├── store/          # Zustand stores
│   │   │   └── index.ts
│   │   ├── types/          # TypeScript type definitions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Vite entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── vite.config.ts      # Vite configuration
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration files
│   │   ├── lib/           # Utilities and database
│   │   ├── utils/         # Helper functions
│   │   ├── types/         # TypeScript definitions
│   │   ├── data/          # Sample data
│   │   ├── app.ts         # Express app setup
│   │   ├── index.ts       # Server entry point
│   │   └── seed.ts        # Database seeding
│   ├── prisma/            # Database schema and migrations
│   │   ├── schema.prisma  # Database schema
│   │   └── migrations/    # Database migrations
│   └── package.json
├── vercel.json             # Vercel deployment config
├── pnpm-workspace.yaml     # pnpm workspace config
└── README.md
```

## 🚀 Installation

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database

### **Clone Repository**
```bash
git clone https://github.com/rushabhcodes/cartify.git
cd cartify
```

### **Install Dependencies**
```bash
# Install all dependencies (using pnpm workspace)
pnpm install

# Or install separately:
# Frontend
cd frontend
pnpm install

# Backend
cd ../backend
pnpm install
```

## ⚙️ Environment Setup

### **Backend Environment** (`backend/.env`)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/cartify"
JWT_SECRET="your_secure_jwt_secret_key_here"
PORT=3000
```

### **Frontend Environment** (`frontend/.env`)
```env
# Development
VITE_API_BASE_URL=http://localhost:3000/api/v1

# Production
# VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api/v1
```

### **Database Setup**
```bash
cd backend

# Generate Prisma client
pnpm prisma generate

# Apply database schema
pnpm prisma db push

# Seed database with sample data (optional)
pnpm run seed
```

## 🏃‍♂️ Running the Application

### **Development Mode**
```bash
# Terminal 1 - Backend (from project root)
cd backend
pnpm dev
# Server runs on http://localhost:3000

# Terminal 2 - Frontend (from project root)
cd frontend
pnpm dev
# App runs on http://localhost:5173 (Vite default)
```

### **Production Build**
```bash
# Backend
cd backend
pnpm build
pnpm start

# Frontend
cd frontend
pnpm build
pnpm preview
```

## 📡 API Endpoints

### **Base URL**: `/api/v1`

### **Authentication**
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### **Items**
- `GET /items` - Get all items (with optional filtering)
- `GET /items/:id` - Get specific item by ID

### **Cart** (Protected Routes)
- `GET /cart` - Get user's cart items
- `POST /cart` - Add item to cart
- `PUT /cart/:itemId` - Update item quantity in cart
- `DELETE /cart/:itemId` - Remove item from cart
- `DELETE /cart/clear` - Clear entire cart

### **Utility**
- `GET /` - API information
- `GET /health` - Health check
- `GET /docs` - API documentation
- `GET /docs/swagger.json` - OpenAPI specification

## 🌐 Deployment

### **Frontend (Vercel)**
1. Connect GitHub repository to Vercel
2. Set framework preset to "Vite"
3. Set build command: `pnpm build`
4. Set output directory: `dist`
5. Add environment variables
6. Deploy

### **Backend (Vercel)**
1. Configure `vercel.json` for serverless deployment
2. Set environment variables (DATABASE_URL, JWT_SECRET)
3. Prisma client generates automatically via postinstall script
4. Deploy

### **Environment Variables for Production**

**Frontend (Vercel)**:
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api/v1
```

**Backend (Vercel)**:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
```

## 🎯 Key Features Implemented

### **Frontend Features**
- ⚡ **Vite**: Lightning-fast development with HMR
- 🎨 **Shadcn/UI**: Beautiful, accessible component library
- 🛒 **Cart Management**: Add, remove, update quantities with optimistic updates
- 🔐 **Authentication**: Login/signup with JWT token management
- 📱 **Responsive Design**: Mobile-first approach
- 🔄 **State Management**: Zustand for global state
- 📡 **API Integration**: React Query for server state management

### **Backend Features**
- 🔒 **Authentication**: JWT-based secure authentication
- 🗃️ **Database**: PostgreSQL with Prisma ORM
- 📊 **API Documentation**: Swagger/OpenAPI integration
- 🛡️ **Security**: Helmet, CORS, input validation
- 🔧 **Middleware**: Custom error handling and authentication
- 📈 **Performance**: Efficient database queries

## 📱 Screenshots

### **Homepage**
- Clean, modern design with product grid
- Featured products and categories
- Responsive navigation with cart indicator

### **Shopping Cart**
- Slide-out cart drawer
- Real-time quantity updates
- Price calculations
- Empty state handling

### **Authentication**
- Clean login/signup forms
- Form validation
- JWT token management
- Protected route handling

## 🎯 Key Learning Outcomes

- **Frontend Development**: Modern React with Vite, TypeScript, and state management
- **Backend Development**: RESTful API design, authentication, and database integration
- **Database Design**: Relational schema design with Prisma ORM
- **State Management**: Global state with Zustand and server state with React Query
- **Authentication**: JWT implementation with secure token handling
- **API Design**: RESTful endpoints with proper HTTP methods and status codes
- **Deployment**: Modern deployment practices with Vercel
- **Developer Experience**: Fast development with Vite and comprehensive tooling

## 🚀 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management system
- [ ] Product reviews and ratings
- [ ] Admin dashboard for inventory management
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Dark mode support
- [ ] Progressive Web App (PWA) features

## 👨‍💻 Developer

**Rushabh Patil**
- 📧 Email: mail@rushabh.dev
- 🌐 Portfolio: [rushabh.dev](https://rushabh.dev)
- 💼 LinkedIn: [linkedin.com/in/rushabh1134](https://linkedin.com/in/rushabh1134)
- 🐱 GitHub: [github.com/rushabhcodes](https://github.com/rushabhcodes)
- 📍 Location: Mumbai, Maharashtra, India

### **About the Developer**
Full-stack developer specializing in modern web technologies. Building web and mobile products with React, Next.js, and Flutter, with a focus on clean design, efficient systems, and practical solutions that enhance user and business outcomes.

## 📄 License

This project is created for educational purposes as part of academic coursework.

---

**Built with ❤️ by Rushabh Patil**
