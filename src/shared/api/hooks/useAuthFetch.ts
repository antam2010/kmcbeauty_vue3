import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/stores/auth';
import { refreshAccessToken } from '@/shared/api/auth';

export function useAuthFetch() {
  const { token, setToken, clearToken } = useAuthStore();
  const navigate = useNavigate();

  const authFetch = useCallback(
    async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
      const headers = new Headers(init.headers || {});
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      const fetchInit = { ...init, headers };
      let response = await fetch(input, fetchInit);

      if (response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          setToken(newAccessToken);

          headers.set('Authorization', `Bearer ${newAccessToken}`);
          response = await fetch(input, { ...init, headers });
        } catch (err) {
          clearToken();
          navigate('/manager/login');
          throw new Error('토큰 재발급 실패');
        }
      }

      return response;
    },
    [token, setToken, clearToken, navigate]
  );

  return { authFetch };
}
