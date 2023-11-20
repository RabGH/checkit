import React from "react";
import KanbanBoard from "@/components/kanban/kanban-board";
import { currentUser } from "@clerk/nextjs";

const KanbanProvider = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Error: User not authenticated</div>;
  }
  return (
    <>
      <KanbanBoard userId={userId} />
    </>
  );
};

export default KanbanProvider;
