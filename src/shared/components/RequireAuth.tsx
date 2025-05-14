import { useEffect, useState } from 'react';
import { useAuthStore } from '@/shared/stores/auth';
import { refreshToken } from '@/shared/api/auth';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken, clearToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          const newToken = await refreshToken();
          setToken(newToken.access_token);
        }
      } catch {
        clearToken();
        navigate('/manager/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, setToken, clearToken, navigate]);

  if (loading) return <div>로딩 중...</div>;

  return <>{children}</>;
};

export default RequireAuth;
