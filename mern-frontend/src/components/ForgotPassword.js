import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email'); // 'email' or 'reset'
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      setMessage('Reset token generated successfully! Check the response below.');
      setResetToken(res.data.resetToken);
      setStep('reset');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to generate reset token');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      await api.post('/api/auth/reset-password', { 
        resetToken, 
        newPassword 
      });
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  if (step === 'reset') {
    return (
      <div className="container">
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Reset Token:</strong> {resetToken}
          </div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
          <button type="button" onClick={() => setStep('email')} style={{ backgroundColor: '#6c757d' }}>
            Back
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Token...' : 'Send Reset Token'}
        </button>
        <button type="button" onClick={handleBackToLogin} style={{ backgroundColor: '#6c757d' }}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword; 