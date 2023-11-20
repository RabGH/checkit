"use client";

import React, { useState, useTransition } from "react";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card } from "@/components/ui/card";
import { Id, Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KanbanTaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const KanbanTaskCard = ({
  task,
  deleteTask,
  updateTask,
}: KanbanTaskCardProps) => {
  const [editMode, setEditMode] = useState(false);
  const [isTaskDeleting, startTaskDeletionTransition] = useTransition();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="h-[100px] min-h-[100px] w-full p-2 flex flex-col rounded-lg border border-rose-500 dark:bg-rose-900 dark:opacity-20 bg-rose-500/5"
      />
    );
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleDeleteTask = () => {
    startTaskDeletionTransition(() => deleteTask(task.id));
  };

  if (isTaskDeleting) {
    return (
      <Card className="mb-2 h-[100px] min-h-[100px] w-full p-2 flex flex-col rounded-lg border border-rose-500 dark:bg-rose-900 bg-rose-500/5">
        <div className="flex items-center justify-center h-full w-full">
          <ReloadIcon className="animate-spin w-8 h-8 text-rose-500 dark:text-rose-300" />
          <div className="ml-2">Deleting Task...</div>
        </div>
      </Card>
    );
  }

  if (editMode) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group relative h-[100px] min-h-[100px] w-full p-2 flex flex-col dark:bg-black rounded-lg border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/5 dark:hover:bg-gray-900/5 transition duration-200 ease-in-out cursor-grab"
      >
        <Textarea
          value={task.content}
          autoFocus
          placeholder="Task Content Here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          className="w-full h-full resize-none text-black dark:text-white focus-visible:text-black focus-visible:ring-rose-500 dark:focus-visible:bg-black border-none"
        />
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="group relative h-[100px] min-h-[100px] w-[332px] min-w-[90%] p-2 dark:bg-black rounded-lg flex flex-col border border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/5 dark:hover:bg-gray-900/5 transition duration-200 ease-in-out cursor-grab"
    >
      <ScrollArea className="my-auto h-[90%]" thumbClassName="bg-rose-700">
        <div className="break-all">{task.content}</div>
      </ScrollArea>
      <Button
        className="absolute top-1/2 right-5 -translate-y-1/2 opacity-0 group-hover:opacity-100 border-rose-500/30 transition duration-500 ease-in-out"
        onClick={handleDeleteTask}
        variant={"kanban"}
        size={"sm"}
      >
        <TrashIcon />
      </Button>
    </Card>
  );
};

export default KanbanTaskCard;
