import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../shared/api/auth';
import { useAuthStore } from '../../shared/stores/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('antam2010@naver.com');
  const [password, setPassword] = useState<string>('1111');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginRequest({
        username: email,
        password,
      });
      setToken(res.access_token);
      navigate('/manager');
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">매니저 로그인</h1>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
