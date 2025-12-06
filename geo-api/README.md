# Geo Location API

Node.js Express API for geolocation app authentication and management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Seed the database with test users:
```bash
npm run seed
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8000`

## API Endpoints

### POST /api/login
Login with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "admin@example.com"
  }
}
```

## Test Credentials

- Email: `admin@example.com`, Password: `password123`
- Email: `user@example.com`, Password: `password456`
