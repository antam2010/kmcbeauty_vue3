import { useEffect, useState } from 'react';
import { useAuthStore } from '@/shared/stores/auth';
import { refreshAccessToken } from '@/shared/api/auth';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken, clearToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          const newToken = await refreshAccessToken();
          setToken(newToken);
        }
      } catch (err) {
        clearToken();
        navigate('/manager/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return <>{children}</>;
};

export default RequireAuth;
