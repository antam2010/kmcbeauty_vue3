import { Routes, Route, Link } from 'react-router-dom';
import ManagerRoutes from '@/manager/routes';
import Login from './manager/pages/Login';
import PrivacyPolicy from './manager/pages/PrivacyPolicy';
import TermsOfService from './manager/pages/TermsOfService';

function App() {
  return (
    <Routes>
      {/* 매니저 페이지 라우트 */}
      <Route path="/manager/*" element={<ManagerRoutes />} />

      {/* 메인 페이지 */}
      <Route
        path="/"
        element={
          <div className="text-center p-10">
            <h1 className="text-3xl font-bold text-blue-600">메인 페이지</h1>

            <div className="mt-6 space-x-4">
              <Link
                to="/manager/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                로그인
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-gray-700 underline hover:text-black"
              >
                이용약관
              </Link>
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-700 underline hover:text-black"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>
        }
      />

      {/* 개별 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}

export default App;
