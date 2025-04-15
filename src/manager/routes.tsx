import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/manager" element={<Dashboard />} />
      <Route path="/manager/login" element={<Login />} />
    </Routes>
  );
};

export default ManagerRoutes;
