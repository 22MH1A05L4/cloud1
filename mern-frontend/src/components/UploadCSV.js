import { useState } from 'react';
import api from '../api';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('File uploaded and data distributed successfully!');
      setFile(null);
      e.target.reset();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <p>Select a CSV file to upload and distribute tasks to agents</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadCSV;
