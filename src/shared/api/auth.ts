const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
  
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  
    if (!response.ok) {
      throw new Error('로그인 실패');
    }
  
    const data = await response.json();
    return data; // access_token 등 포함
  }
  