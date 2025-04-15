import Sidebar from '../components/Sidebar';

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default ManagerLayout;
