import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/customers/CustomerList';
import RequireAuth from '@/shared/components/RequireAuth';
import ManagerLayout from './layout/ManagerLayout';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path=""
        element={
          <RequireAuth>
            <ManagerLayout>
              <Dashboard />
            </ManagerLayout>
          </RequireAuth>
        }
      />
      <Route
        path="customers"
        element={
          <RequireAuth>
            <ManagerLayout>
              <CustomerList />
            </ManagerLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default ManagerRoutes;
