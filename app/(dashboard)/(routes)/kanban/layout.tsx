const KanbanBoardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="max-w-[90%]">{children}</div>;
};

export default KanbanBoardLayout;
