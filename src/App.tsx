import { Routes, Route } from 'react-router-dom';
import Dashboard from './manager/pages/Dashboard';
import Login from './manager/pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/manager" element={<Dashboard />} />
      <Route path="/manager/login" element={<Login />} />
      <Route path="/" element={
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-blue-600">메인 페이지</h1>
          <p className="mt-4 text-gray-600">지금은 매니저 페이지 준비 중입니다.</p>
          <a href="/manager/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            매니저 화면으로 이동
          </a>
        </div>
      } />
    </Routes>
  );
}

export default App;
