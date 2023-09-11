const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="flex flex-grow w-full justify-center">
        <div className="flex flex-col flex-grow px-4 py-12 max-w-screen-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
