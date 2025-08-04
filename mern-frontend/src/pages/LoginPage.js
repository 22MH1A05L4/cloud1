import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { setToken } from '../auth';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/api/auth/login', form);
      setToken(res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link to="/forgot-password" style={{ color: '#667eea', textDecoration: 'none' }}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
