import { useAuthStore } from '../../../shared/stores/auth';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">대시보드 홈</h2>
      <p>이곳에 매니저용 콘텐츠가 표시됩니다.</p>
      <p className="break-all text-sm text-gray-700">
        Access Token: {useAuthStore.getState().token}
      </p>
    </div>
  );
};

export default Dashboard;
