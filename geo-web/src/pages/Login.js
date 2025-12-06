import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (type) => {
    if (type === 'admin') {
      setEmail('admin@example.com');
      setPassword('password123');
    } else {
      setEmail('user@example.com');
      setPassword('password456');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Geolocation App</h1>
        <p className="subtitle">Login to view your IP information</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="test-credentials">
          <p>Test Credentials:</p>
          <button
            type="button"
            onClick={() => fillTestCredentials('admin')}
            className="btn-test"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => fillTestCredentials('user')}
            className="btn-test"
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
