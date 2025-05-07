import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/shared/stores/auth';
import { refreshToken } from '@/api/manager/auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


// ✅ 요청 인터셉터: 매 요청 시 Authorization 헤더 자동 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ✅ 응답 인터셉터: 401 에러 시 Refresh → 재요청
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const is401 = error.response?.status === 401;
    const isRefreshCall = originalRequest?.url?.includes('/auth/refresh');

    if (!originalRequest || !is401 || isRefreshCall || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { access_token } = await refreshToken();
      useAuthStore.getState().setToken(access_token);

      if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
        originalRequest.headers.set('Authorization', `Bearer ${access_token}`);
      } else {
        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${access_token}`;
      }
      
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearToken();

      if (typeof window !== 'undefined') {
        console.warn('[AUTH] Refresh token expired. Redirecting to login.');
        window.location.href = '/manager/login';
      }

      return Promise.reject(refreshError);
    }
  }
);
