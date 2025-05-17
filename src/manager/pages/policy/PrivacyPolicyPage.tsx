// pages/PrivacyPolicy.tsx
export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">개인정보처리방침</h2>
      <p className="text-sm leading-relaxed">
        본 서비스는 회원가입 시 이메일(아이디), 별명 정보를 수집하며, 샵 등록 시
        샵명, 주소, 전화번호, 사업자등록번호를 입력받습니다. 수집된 정보는
        서비스 제공 및 사용자 확인 외의 목적으로 사용되지 않으며,
        열람/수정/삭제는 언제든 가능합니다. <br />
        <br />
        운영자는 서비스를 자유롭게 종료할 수 있으며, 종료 시 개인정보는 즉시
        파기되거나 요청 시 반환됩니다. 쿠키는 인증용 리프레시 토큰에만 사용되며,
        제3자 제공 및 위탁은 없습니다.
      </p>
    </div>
  );
}
