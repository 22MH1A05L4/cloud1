// src/components/Dashboard.js
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import AddAgent from './AddAgent';
import UploadCSV from './UploadCSV';
import ChangePassword from './ChangePassword';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="form-section">
        <AddAgent />
      </div>
      
      <div className="form-section">
        <UploadCSV />
      </div>

      <div className="form-section">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Dashboard;
