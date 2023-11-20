import React from "react";
import { Suspense } from "react";

import WelcomeMsg from "@/components/dashboard/welcome";
import WelcomeMsgFallback from "@/components/dashboard/welcome-fallback";

import KanbanProvider from "@/components/kanban/kanban-provider";

const KanbanBoardPage = () => {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading columns...</div>}>
        <KanbanProvider />
      </Suspense>
    </>
  );
};

export default KanbanBoardPage;
