import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../../shared/stores/auth';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-10 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">대시보드 홈</h2>
        <p>이곳에 매니저용 콘텐츠가 표시됩니다.</p>
        <p>Access Token: {useAuthStore.getState().token}</p>
      </main>
    </div>
  );
};

export default Dashboard;
