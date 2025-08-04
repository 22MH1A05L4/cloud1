import { useState } from 'react';
import api from '../api';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>Change Password</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
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
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword; 