const KanbanBoardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md:max-w-screen-md lg:max-w-screen-xl sm:max-w-screen-sm max-w-xs">
      {children}
    </div>
  );
};

export default KanbanBoardLayout;
