import Sidebar from '../components/Sidebar';

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen overflow-x-hidden">
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between p-4">
      <Sidebar />
      </aside>
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default ManagerLayout;
