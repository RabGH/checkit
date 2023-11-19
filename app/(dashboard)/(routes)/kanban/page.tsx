import React from "react";
import { Suspense } from "react";

import WelcomeMsg from "@/components/dashboard/welcome";
import WelcomeMsgFallback from "@/components/dashboard/welcome-fallback";
import KanbanBoard from "@/components/kanban/kanban-board";

const KanbanBoardPage = () => {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>

      <KanbanBoard />
    </>
  );
};

export default KanbanBoardPage;
