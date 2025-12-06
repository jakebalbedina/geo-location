## Project Setup Guide

This guide walks you through setting up and running the Geolocation App on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/jakebalbedina/geo-location.git
cd geo-location
```

### Step 2: Setup Backend (Node.js API)

Open a new terminal and run:

```bash
cd geo-api
npm install
```

**Seed the database with test users:**

```bash
npm run seed
```

You should see output like:
```
Connected to SQLite database
Users table initialized
Users seeded successfully!

Test Credentials:
Email: admin@example.com
Password: password123

Alternative:
Email: user@example.com
Password: password456
```

**Start the backend server:**

```bash
npm start
```

You should see:
```
Server running on http://localhost:8000
```

Leave this terminal running!

### Step 3: Setup Frontend (React App)

Open another terminal and run:

```bash
cd geo-web
npm install
```

**Start the frontend development server:**

```bash
npm start
```

This will automatically open `http://localhost:3000` in your browser. If it doesn't, manually navigate to it.

## Testing the Application

### Login

1. You should see the login page
2. Use one of the test credentials:
   - Email: `admin@example.com`, Password: `password123`
   - OR Email: `user@example.com`, Password: `password456`
3. Click "Login"

You can also use the quick "Admin" or "User" buttons to auto-fill credentials.

### Home Screen Features

**Your Location:**
- Your current IP address and geolocation information are displayed
- A map shows your exact location with a marker

**Search for IP:**
1. Enter an IP address in the search box (e.g., `8.8.8.8`)
2. Click "Search"
3. The geolocation for that IP will be displayed with an updated map
4. The entry will be added to your search history

**Clear Search:**
- Click "Clear" to return to viewing your own geolocation

**Search History:**
- View all your previous searches in the right panel
- Click on any history entry to view its geolocation again
- Check the checkbox next to entries to select them
- Click "Delete Selected" to remove checked entries
- Click "Clear All" to remove all history

**Logout:**
- Click the "Logout" button in the top right to return to the login page

## Test IPs for Exploration

Try these public IP addresses to test the app:

- `8.8.8.8` - Google DNS (Mountain View, CA)
- `1.1.1.1` - Cloudflare DNS (Los Angeles, CA)
- `208.67.222.222` - OpenDNS (San Francisco, CA)
- `103.25.184.77` - International IP

## Troubleshooting

### Frontend shows "Connecting to API" but fails

**Solution:** Ensure the backend is running on `http://localhost:8000`

Check if the backend is running:
```bash
curl http://localhost:8000/health
```

You should get a response: `{"status":"OK"}`

### "Invalid IP address" error when searching

**Solution:** Make sure you enter a valid IPv4 or IPv6 address

Valid examples:
- IPv4: `8.8.8.8`, `1.1.1.1`
- IPv6: `2001:4860:4860::8888`

### Port already in use errors

**Backend port 8000:**
```bash
# Find and kill process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend port 3000:**
```bash
# Find and kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database errors

If you get database errors, reset it:
```bash
cd geo-api
# Delete the database file
rm geo.db
# Re-seed
npm run seed
```

### npm install errors on Windows

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

## Project Architecture

```
geo-location/
├── geo-api/                    # Backend (Node.js/Express)
│   ├── routes/auth.js         # Login endpoint
│   ├── seeders/userSeeder.js  # Database seeder
│   ├── database.js            # SQLite configuration
│   ├── server.js              # Main server file
│   └── package.json
│
├── geo-web/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/            # Page components (Login, Home)
│   │   ├── components/       # Reusable components (Map, ProtectedRoute)
│   │   ├── services/         # API calls (auth, geolocation)
│   │   ├── utils/            # Helper functions (validators)
│   │   └── App.js
│   └── package.json
│
└── README.md                   # Main documentation
```

## API Documentation

### Login Endpoint
```
POST http://localhost:8000/api/login
Content-Type: application/json

Request:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@example.com"
  }
}
```

### Geolocation API
```
GET https://ipinfo.io/json                    # Your IP's geolocation
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

## Development Notes

### Adding New Features

1. **Backend:** Add new routes in `geo-api/routes/`
2. **Frontend:** Add new pages in `geo-web/src/pages/`
3. **API calls:** Update `geo-web/src/services/api.js`
4. **Components:** Add reusable components in `geo-web/src/components/`

### Database Management

The backend uses SQLite. The database file `geo.db` is created automatically when you run `npm start`.

To view database contents:
```bash
sqlite3 geo-api/geo.db
SELECT * FROM users;
```

### Security Notes

⚠️ This is a demonstration project. For production:
- Use HTTPS
- Implement CSRF protection
- Add rate limiting
- Hash and salt passwords (already done)
- Implement proper error handling
- Add input validation and sanitization
- Use environment variables for secrets

## Deployment

### Deploy Backend

Options:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

Before deploying, update the database to use PostgreSQL or MySQL instead of SQLite.

### Deploy Frontend

Options:
- Vercel (recommended for React)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Production Setup

1. Update `API_BASE` URL in `geo-web/src/services/api.js`
2. Build the frontend: `npm run build`
3. Deploy both backend and frontend
4. Update CORS settings in backend

## Support & Issues

If you encounter any issues:

1. Check this troubleshooting section
2. Verify all prerequisites are installed
3. Check that both servers are running on correct ports
4. Clear cache: `npm cache clean --force`
5. Reinstall dependencies: `rm -rf node_modules && npm install`

## License

MIT License - Free to use for learning and development.

## Acknowledgments

- Built with React, Node.js, Express, and SQLite
- Geolocation data from ipinfo.io
- Maps powered by Leaflet and OpenStreetMap
