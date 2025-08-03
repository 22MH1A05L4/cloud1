import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddAgent from "./components/AddAgent";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import UploadCSV from "./components/UploadCSV";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/add-agent" element={
          <ProtectedRoute>
            <AddAgent />
          </ProtectedRoute>
        } />
        <Route path="/upload-csv" element={
          <ProtectedRoute>
            <UploadCSV />
          </ProtectedRoute>
        } />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
