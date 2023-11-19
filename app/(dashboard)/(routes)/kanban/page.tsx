import React from "react";
import { Suspense } from "react";

import WelcomeMsg from "@/components/dashboard/welcome";
import WelcomeMsgFallback from "@/components/dashboard/welcome-fallback";
import KanbanBoard from "@/components/kanban/kanban-board";
import KanbanList from "@/components/kanban/kanban-list";

const KanbanBoardPage = () => {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading columns...</div>}>
        <KanbanBoard />
      </Suspense>
    </>
  );
};

export default KanbanBoardPage;
