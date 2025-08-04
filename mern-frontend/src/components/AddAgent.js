// src/components/AddAgent.js
import { useState } from 'react';
import api from '../api';

const AddAgent = () => {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await api.post('/api/agents/register', form);
      setMessage('Agent added successfully!');
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add Agent</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          placeholder="Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="email" 
          type="email"
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="mobile" 
          placeholder="Mobile" 
          value={form.mobile} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Agent...' : 'Add Agent'}
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
