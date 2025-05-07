import { axiosInstance } from '@/shared/api/axios';
import axios from 'axios';
import type { Auth } from '@/shared/types/auth'; // access_token, token_type 인터페이스

// 로그인
export const login = async (username: string, password: string): Promise<Auth> => {
  const res = await axiosInstance.post<Auth>('/auth/login', {
    username,
    password,
    grant_type: 'password',
  });
  return res.data;
};

// 로그아웃
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

// 액세스 토큰 재발급
export const refreshToken = async (): Promise<Auth> => {
  const res = await axios.post<Auth>(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, null, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};
