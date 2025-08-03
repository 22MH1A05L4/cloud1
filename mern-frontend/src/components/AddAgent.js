// src/components/AddAgent.js
import { useState } from 'react';
import api from '../api';

const AddAgent = () => {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/agents', form);
      alert('Agent added');
    } catch (err) {
      alert('Failed to add agent');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Agent</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Add Agent</button>
    </form>
  );
};

export default AddAgent;
