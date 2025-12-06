# Geolocation App - Full Stack

A complete full-stack application for viewing IP geolocation information with user authentication. Built with React and Node.js.

## Project Structure

```
geo-location/
├── geo-api/          # Node.js Express Backend
├── geo-web/          # React Frontend
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd geo-api
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database with test users:
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

The API will run on `http://localhost:8000`

#### Test Credentials (after seeding)

- Email: `admin@example.com`, Password: `password123`
- Email: `user@example.com`, Password: `password456`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd geo-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

### Authentication
- ✅ Login form with email and password
- ✅ User database with hashed passwords
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ Automatic redirect to login/home based on auth status

### Home Screen
- ✅ Display user's current IP and geolocation
- ✅ Full geolocation details (IP, Country, City, Region, Coordinates, ISP, Timezone, Postal)
- ✅ Interactive map with location marker
- ✅ Search for any IP address
- ✅ IP address validation (IPv4 and IPv6)
- ✅ Clear search to revert to user's location
- ✅ Error handling for invalid IPs
- ✅ Search history with timestamps
- ✅ Click history items to view past geolocation data
- ✅ Multi-select delete for history items
- ✅ Clear all history button
- ✅ Responsive design

## API Endpoints

### Login API
```
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "admin@example.com"
  }
}
```

### Geolocation API
```
GET https://ipinfo.io/json                    # Current user's IP
GET https://ipinfo.io/{ip}/json              # Specific IP geolocation

Response:
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.4192,-122.0574",
  "org": "AS15169 Google LLC",
  "postal": "94043",
  "timezone": "America/Los_Angeles"
}
```

## Technologies Used

### Backend
- Node.js with Express
- SQLite3 for database
- bcryptjs for password hashing
- jsonwebtoken for JWT tokens
- CORS for cross-origin requests
- dotenv for environment variables

### Frontend
- React 18
- React Router DOM for routing
- Axios for HTTP requests
- Leaflet for interactive maps
- CSS3 for styling

## Directory Structure

### Backend (geo-api)
```
geo-api/
├── routes/
│   └── auth.js           # Login endpoint
├── seeders/
│   └── userSeeder.js     # Database seeder
├── server.js             # Express server
├── database.js           # SQLite database config
├── package.json
├── .env
└── README.md
```

### Frontend (geo-web)
```
geo-web/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── components/
│   │   ├── GeoMap.js     # Leaflet map component
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Login.js      # Login page
│   │   ├── Login.css
│   │   ├── Home.js       # Home page with geolocation
│   │   └── Home.css
│   ├── services/
│   │   └── api.js        # API calls
│   ├── utils/
│   │   └── validators.js # IP validation
│   ├── App.js
│   ├── index.js
│   ├── package.json
│   └── README.md
```

## Testing

### Test the Application

1. **Backend is running**: Visit `http://localhost:8000/health` to verify
2. **Frontend is running**: Visit `http://localhost:3000` in your browser
3. **Login**: Use the test credentials provided
4. **Search IPs**: Try searching for common IPs like:
   - `8.8.8.8` (Google)
   - `1.1.1.1` (Cloudflare)
   - `208.67.222.222` (OpenDNS)

## GitHub Repository

This project is hosted on GitHub at: [Your Repository URL]

To clone and run locally:
```bash
git clone https://github.com/jakebalbedina/geo-location.git
cd geo-location

# Backend
cd geo-api
npm install
npm run seed
npm start

# Frontend (in another terminal)
cd geo-web
npm install
npm start
```

## Optional Features Implemented

- ✅ Interactive map with location pins
- ✅ Search history with click functionality
- ✅ Multi-select delete for history
- ✅ Responsive design for mobile devices

## Deployment

### Backend Deployment
The backend can be deployed to services like:
- Heroku
- Railway
- Render
- AWS EC2

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Environment Variables

### Backend (.env)
```
PORT=8000
JWT_SECRET=your-secret-key-change-in-production
```

### Frontend
No environment variables needed (API URL is hardcoded in development)

## Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `npm install`
- Check if port 8000 is available

### Frontend won't start
- Ensure Node.js is installed
- Delete `node_modules` and reinstall: `npm install`
- Check if port 3000 is available

### Map not showing
- Ensure Leaflet is properly installed
- Check browser console for errors
- Verify coordinates are valid

### Login fails
- Ensure backend is running on localhost:8000
- Check database has been seeded: `npm run seed` in geo-api
- Verify credentials are correct

## License

MIT License - Feel free to use this project for learning purposes.

## Author

Jake Balbedina

---

**Note**: This is a demonstration project. For production use, implement additional security measures like:
- HTTPS
- CSRF protection
- Rate limiting
- Input sanitization
- Error logging
- User session management
