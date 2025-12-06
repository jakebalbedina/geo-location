# Geolocation Web App

A React web app for viewing IP geolocation information with authentication.

## Features

- User authentication with email and password
- View current IP and geolocation information
- Search for geolocation of any IP address
- Search history with ability to click and view past searches
- Delete individual or multiple search history items
- Interactive map showing exact location with pin
- Input validation for IP addresses
- Responsive design

## Tech Stack

- React 18
- React Router DOM
- Axios for HTTP requests
- Leaflet for maps
- CSS3 for styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Configuration

Make sure the backend API is running on `http://localhost:8000` for the login endpoint.

## API Endpoints Used

- **Login**: `http://localhost:8000/api/login` (POST)
- **Geolocation**: `https://ipinfo.io/json` (GET) or `https://ipinfo.io/{ip}/json`

## Test Credentials

Use the backend seeder to generate test users. Default credentials:
- Email: `admin@example.com`, Password: `password123`
- Email: `user@example.com`, Password: `password456`

## Features

### Login Screen
- Email and password form
- Quick test credential buttons
- Form validation

### Home Screen
- Display of current user's IP and geolocation
- Search functionality for any IP address
- Real-time map with location marker
- Full geolocation details (City, Country, Region, ISP, Timezone, etc.)
- Search history with timestamp
- Ability to click history to view past searches
- Multi-select delete for history items
- Clear all history button

## Usage

1. Login with valid credentials
2. View your current IP and location on the map
3. Enter any IP address to see its geolocation
4. Click on history items to view past searches
5. Check history items and delete them
6. Click "Clear" to revert to your own geolocation
