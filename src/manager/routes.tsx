import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from '@/shared/components/RequireAuth';
import ManagerLayout from './layout/ManagerLayout';

import CustomerList from './pages/customers/CustomerList';
import TreatmentMenuList from './pages/treatment_menu/TreatmentMenuList';

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
      <Route
        path="treatment-menus"
        element={
          <RequireAuth>
            <ManagerLayout>
              <TreatmentMenuList />
            </ManagerLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default ManagerRoutes;
