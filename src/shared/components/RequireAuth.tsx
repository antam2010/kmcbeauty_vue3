import { useEffect, useState } from "react";
import { useAuthStore } from "@/shared/stores/useTokenStore";
import { refreshToken } from "@/shared/api/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
        navigate("/manager/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, setToken, clearToken, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <span className="text-gray-700 text-sm font-medium">
            인증 상태를 확인 중입니다...
          </span>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAuth;
