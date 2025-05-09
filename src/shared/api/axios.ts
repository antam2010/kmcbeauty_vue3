import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/shared/stores/auth";
import { refreshToken } from "@/api/manager/auth";

// 백엔드 에러 응답 타입 정의
type ErrorResponse = {
  detail?: {
    code?: string;
    message?: string;
  };
};

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ 요청 인터셉터: Authorization 헤더 자동 설정
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ✅ 응답 인터셉터: 에러 처리 및 리프레시 토큰 로직
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;
    const data = error.response?.data;

    // 1. 서버 내부 오류 처리 (500)
    if (status === 500) {
      console.error("[SERVER ERROR]", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }

    // 2. 선택된 상점 없음 처리
    if (status === 404 && data?.detail?.code === "SHOP_NOT_SELECTED") {
      if (typeof window !== "undefined") {
        console.warn("[AUTH] 선택된 상점 없음. 상점 선택 페이지로 이동합니다.");
        window.location.href = "/manager/shops/selected";
      }
      return Promise.reject(error);
    }

    // 3. 인증 실패 (401) + 리프레시 조건 확인
    const is401 = status === 401;
    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

    if (!originalRequest || !is401 || isRefreshCall || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 4. 무한 루프 방지를 위한 재시도 플래그 설정
    originalRequest._retry = true;

    try {
      // 5. 리프레시 토큰 요청
      const { access_token } = await refreshToken();
      useAuthStore.getState().setToken(access_token);

      // 6. Authorization 헤더에 새 토큰 설정
      if (
        originalRequest.headers &&
        typeof originalRequest.headers.set === "function"
      ) {
        originalRequest.headers.set("Authorization", `Bearer ${access_token}`);
      } else {
        (originalRequest.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${access_token}`;
      }

      // 7. 원래 요청 재시도
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // 8. 리프레시 실패 → 로그아웃 처리
      useAuthStore.getState().clearToken();

      if (typeof window !== "undefined") {
        console.warn("[AUTH] 리프레시 토큰 만료. 로그인 페이지로 이동합니다.");
        window.location.href = "/manager/login";
      }

      return Promise.reject(refreshError);
    }
  }
);
