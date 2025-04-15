import { axiosInstance } from './axios';

/**
 * 로그인 요청
 * - grant_type: password 방식 사용
 * - Content-Type: x-www-form-urlencoded
 * - 응답에는 access_token, refresh_token 등이 포함됨
 */
export async function loginRequest({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);
  body.append('grant_type', 'password');

  const { data } = await axiosInstance.post('/auth/login', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return data; // access_token, refresh_token 포함된 응답
}

/**
 * access_token 재발급 요청
 * - 쿠키에 저장된 refresh_token을 통해 새로운 access_token을 받음
 * - axiosInstance에 withCredentials: true가 설정되어 있어야 함
 */
export async function refreshAccessToken(): Promise<string> {
  const response = await axiosInstance.post('/auth/refresh');
  return response.data.access_token;
}
