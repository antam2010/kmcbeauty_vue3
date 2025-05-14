import ShopSelectList from '@/manager/components/common/ShopSelectList';

const ShopSelectPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-center">상점을 선택해주세요</h1>
        <ShopSelectList />
      </div>
    </div>
  );
};

export default ShopSelectPage;
