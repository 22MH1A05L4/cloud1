// src/components/Dashboard.js
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import AddAgent from './AddAgent';
import UploadCSV from './UploadCSV';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <AddAgent />
      <UploadCSV />
    </div>
  );
};

export default Dashboard;
