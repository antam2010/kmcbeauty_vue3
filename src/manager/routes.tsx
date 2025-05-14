import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import Dashboard from './pages/dashboard/DashboardPage';
import RequireAuth from '@/shared/components/RequireAuth';
import ManagerLayout from './layout/ManagerLayout';

import CustomerList from './pages/customers/CustomerList';
import TreatmentMenuList from './pages/treatment_menu/TreatmentMenuListPage';
import TreatmentCalendarPage from './pages/treatment/treatmentListPage';

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
      <Route
        path="treatments"
        element={
          <RequireAuth>
            <ManagerLayout>
              <TreatmentCalendarPage />
            </ManagerLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default ManagerRoutes;
