import axios from 'axios';
import { useAuthStore } from '@/shared/stores/auth';
import { refreshToken } from '@/api/manager/auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type' : 'application/json',
    Accept         : 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }
    

    originalRequest._retry = true;

    try {
      const { access_token } = await refreshToken();
      useAuthStore.getState().setToken(access_token);
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // ✅ 리프레시 실패 시 토큰 제거 및 로그인 페이지 강제 이동
      useAuthStore.getState().clearToken();

      if (typeof window !== 'undefined') {
        console.warn('[AUTH] Refresh token expired. Redirecting to login.');
        window.location.href = '/manager/login';
      }

      return Promise.reject(refreshError);
    }
  }
);
