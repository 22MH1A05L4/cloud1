import { useState } from 'react';
import api from '../api';

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded and data distributed successfully');
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert(err.response?.data.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCSV;
