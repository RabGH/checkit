"use client";

import React, { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";

import { Card } from "@/components/ui/card";
import { Id, Task } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface KanbanTaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
}

const KanbanTaskCard = ({ task, deleteTask }: KanbanTaskCardProps) => {
  return (
    <Card className="group relative h-[100px] min-h-[100px] p-2 dark:bg-black rounded-lg flex flex-col border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/5 dark:hover:bg-gray-900/5 transition duration-200 ease-in-out cursor-grab">
      {task.content}
      <Button
        className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-rose-500/30 transition duration-500 ease-in-out"
        onClick={() => deleteTask(task.id)}
        variant={"kanban"}
        size={"sm"}
      >
        <TrashIcon />
      </Button>
    </Card>
  );
};

export default KanbanTaskCard;
