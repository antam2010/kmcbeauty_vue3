export function parseErrorMessage(e: unknown): string {
  if (
    typeof e === "object" &&
    e !== null &&
    "response" in e &&
    typeof (e as { response?: { status?: number } }).response === "object"
  ) {
    const status = (e as { response?: { status?: number } }).response?.status;
    if (status === 400) return "잘못된 요청입니다.";
    if (status === 409) return "이미 등록된 정보입니다.";
    return `서버 오류 (${status})`;
  }
  if (e instanceof Error) return e.message;
  return "알 수 없는 오류가 발생했습니다.";
}
