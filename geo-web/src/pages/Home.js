import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoService, authService } from '../services/api';
import { validateIP, getCoordinates } from '../utils/validators';
import GeoMap from '../components/GeoMap';
import './Home.css';

const Home = () => {
  const [currentGeo, setCurrentGeo] = useState(null);
  const [searchIP, setSearchIP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [selectedHistoryIndices, setSelectedHistoryIndices] = useState(new Set());
  const navigate = useNavigate();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await geoService.getGeoLocation();
        setCurrentGeo(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch your location');
      } finally {
        setLoading(false);
      }
    };

    // Load history from localStorage
    const savedHistory = localStorage.getItem('geoHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    loadInitialData();
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('geoHistory', JSON.stringify(history));
  }, [history]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (!searchIP.trim()) {
      setError('Please enter an IP address');
      return;
    }

    if (!validateIP(searchIP)) {
      setError('Invalid IP address format');
      return;
    }

    try {
      setLoading(true);
      const data = await geoService.getGeoLocation(searchIP);
      setCurrentGeo(data);

      // Add to history
      const historyEntry = {
        ip: searchIP,
        city: data.city,
        country: data.country,
        loc: data.loc,
        timestamp: new Date().toLocaleString()
      };

      setHistory([historyEntry, ...history]);
      setSearchIP('');
    } catch (err) {
      setError(err.message || 'Failed to fetch location for this IP');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    try {
      setLoading(true);
      const data = await geoService.getGeoLocation();
      setCurrentGeo(data);
      setSearchIP('');
      setError('');
    } catch (err) {
      setError('Failed to fetch your location');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = async (item) => {
    try {
      setLoading(true);
      const data = await geoService.getGeoLocation(item.ip);
      setCurrentGeo(data);
      setSearchIP(item.ip);
      setError('');
    } catch (err) {
      setError('Failed to fetch location');
    } finally {
      setLoading(false);
    }
  };

  const toggleHistorySelection = (index) => {
    const newSelected = new Set(selectedHistoryIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedHistoryIndices(newSelected);
  };

  const deleteSelectedHistory = () => {
    const newHistory = history.filter((_, index) => !selectedHistoryIndices.has(index));
    setHistory(newHistory);
    setSelectedHistoryIndices(new Set());
  };

  const deleteAllHistory = () => {
    if (window.confirm('Are you sure you want to delete all history?')) {
      setHistory([]);
      setSelectedHistoryIndices(new Set());
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const user = authService.getUser();

  if (loading && !currentGeo) {
    return (
      <div className="home-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Geolocation Tracker</h1>
        <div className="header-actions">
          <span className="user-info">Hello, {user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="home-content">
        <div className="main-section">
          {/* Current Geolocation */}
          <div className="geo-card">
            <h2>Your Location Information</h2>
            {error && <div className="error-message">{error}</div>}

            {currentGeo && (
              <div className="geo-info">
                <div className="info-grid">
                  <div className="info-item">
                    <label>IP Address:</label>
                    <span>{currentGeo.ip}</span>
                  </div>
                  <div className="info-item">
                    <label>Country:</label>
                    <span>{currentGeo.country}</span>
                  </div>
                  <div className="info-item">
                    <label>City:</label>
                    <span>{currentGeo.city}</span>
                  </div>
                  <div className="info-item">
                    <label>Region:</label>
                    <span>{currentGeo.region || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Coordinates:</label>
                    <span>{currentGeo.loc}</span>
                  </div>
                  <div className="info-item">
                    <label>ISP:</label>
                    <span>{currentGeo.org || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Timezone:</label>
                    <span>{currentGeo.timezone || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Postal:</label>
                    <span>{currentGeo.postal || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Map */}
            {currentGeo && currentGeo.loc && (
              <div className="map-section">
                <GeoMap coordinates={getCoordinates(currentGeo.loc)} ip={currentGeo.ip} />
              </div>
            )}

            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-group">
                <input
                  type="text"
                  value={searchIP}
                  onChange={(e) => setSearchIP(e.target.value)}
                  placeholder="Enter an IP address to search (e.g., 8.8.8.8)"
                  disabled={loading}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-search" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
                <button type="button" onClick={handleClear} className="btn-clear" disabled={loading}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History Section */}
        <div className="history-section">
          <div className="history-header">
            <h3>Search History</h3>
            {history.length > 0 && (
              <div className="history-actions">
                {selectedHistoryIndices.size > 0 && (
                  <button onClick={deleteSelectedHistory} className="btn-delete-selected">
                    Delete Selected ({selectedHistoryIndices.size})
                  </button>
                )}
                <button onClick={deleteAllHistory} className="btn-delete-all">
                  Clear All
                </button>
              </div>
            )}
          </div>

          {history.length === 0 ? (
            <p className="no-history">No search history yet</p>
          ) : (
            <div className="history-list">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleHistoryClick(item)}
                >
                  <input
                    type="checkbox"
                    checked={selectedHistoryIndices.has(index)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleHistorySelection(index);
                    }}
                    className="history-checkbox"
                  />
                  <div className="history-content">
                    <div className="history-ip">{item.ip}</div>
                    <div className="history-location">
                      {item.city}, {item.country}
                    </div>
                    <div className="history-time">{item.timestamp}</div>
                  </div>
                  <div className="history-arrow">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
