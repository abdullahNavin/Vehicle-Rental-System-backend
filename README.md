# Vehicle Rental System

A comprehensive backend API for managing vehicle rentals, built with modern technologies and best practices.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Usage Instructions](#usage-instructions)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

---

## 📌 Project Overview

**Project Name:** Vehicle Rental System

**Version:** 1.0.0

**Description:** A full-featured REST API for managing vehicle rental operations, including user authentication, vehicle management, booking system, and user administration. The system supports multiple user roles (Admin, Customer) with role-based access control.

**Live URL:** *(To be deployed)*

---

## ✨ Features

### Authentication & Authorization
- User registration and login with secure password hashing (bcryptjs)
- JWT-based authentication for secure API access
- Role-based access control (RBAC) - Admin and Customer roles
- Token expiration and refresh mechanisms

### Vehicle Management
- Add, update, and retrieve vehicle listings
- Track vehicle availability and rental status
- Support for multiple vehicle types
- Vehicle inventory management

### Booking System
- Create and manage vehicle bookings
- Check vehicle availability for date ranges
- Booking confirmation and cancellation
- Booking history tracking

### User Management
- User profile management
- Update user information
- Admin capabilities for user management
- Role-based user permissions

### Security
- Password encryption using bcryptjs
- JWT token-based authentication
- Protected routes with authentication middleware
- Role-based authorization checks

---

## 🛠️ Technology Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js 5.2.1** - Web application framework

### Language
- **TypeScript** - Type-safe JavaScript

### Database
- **PostgreSQL** - Relational database management system
- **pg 8.16.3** - PostgreSQL client for Node.js

### Authentication & Security
- **jsonwebtoken 9.0.3** - JWT creation and verification
- **bcryptjs 3.0.3** - Password hashing and encryption

### Development Tools
- **tsx 4.21.0** - TypeScript execution for Node.js
- **dotenv 17.2.3** - Environment variable management

### Type Definitions
- **@types/express 5.0.6**
- **@types/jsonwebtoken 9.0.10**
- **@types/pg 8.15.6**

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Vehicle\ Rental\ System
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vehicle_rental_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=6h

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### 4. Database Setup
Connect to PostgreSQL and create the database:
```sql
CREATE DATABASE vehicle_rental_db;
```

#### 5. Run Database Migrations
```bash
# Initialize database schema (run db.ts)
npm run dev
```

#### 6. Start the Development Server
```bash
npm run dev
```

The server will start at `http://localhost:3000`

---

## 📖 Usage Instructions

### Running the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

This uses tsx to watch your TypeScript files and automatically restart the server on changes.

### Testing API Endpoints

Use tools like **Postman**, **Insomnia**, or **cURL** to test the API endpoints.

#### Example: User Registration
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "phone": "+1234567890",
    "role": "customer"
  }'
```

#### Example: User Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - User login with JWT token generation

### Vehicles Routes (`/api/v1/vehicles`)
- `GET /` - Get all vehicles
- `GET /:id` - Get vehicle details
- `POST /` - Add new vehicle (Admin only)
- `PUT /:id` - Update vehicle (Admin only)
- `DELETE /:id` - Delete vehicle (Admin only)

### Bookings Routes (`/api/v1/bookings`)
- `GET /` - Get all bookings
- `GET /:id` - Get booking details
- `POST /` - Create new booking
- `PUT /:id` - Update booking
- `DELETE /:id` - Cancel booking

### Users Routes (`/api/v1/users`)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user profile
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user (Admin only)

---

## 📁 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── config/
│   ├── db.ts              # Database connection setup
│   └── index.ts           # Configuration exports
├── middleware/
│   ├── auth.ts            # JWT authentication middleware
│   └── bookingAuth.ts     # Booking authorization middleware
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts     # Authentication logic
│   │   ├── auth.routes.ts         # Auth endpoints
│   │   └── auth.service.ts        # Auth business logic
│   ├── booking/
│   │   ├── booking.controller.ts  # Booking logic
│   │   ├── booking.routes.ts      # Booking endpoints
│   │   └── booking.service.ts     # Booking business logic
│   ├── users/
│   │   ├── users.controller.ts    # User logic
│   │   ├── users.routes.ts        # User endpoints
│   │   └── users.service.ts       # User business logic
│   └── vehicles/
│       ├── vehicles.controller.ts # Vehicle logic
│       ├── vehicles.routes.ts     # Vehicle endpoints
│       └── vehicles.service.ts    # Vehicle business logic
└── types/
    └── express/
        └── index.d.ts    # Express type definitions

```

---

## 🔐 Authentication

### JWT Token
Upon successful login, the API returns a JWT token:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Using the Token
Include the token in the Authorization header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📝 License

ISC

---

## 👤 Author

Your Name

---

## 📧 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Last Updated:** December 2024
