"use client";

import React, { useMemo, useState, useTransition } from "react";
import { PlusCircledIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Column, Id, Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import KanbanTaskCard from "./kanban-task-card";

interface ColumnContainer {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: number) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: ColumnContainer) {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
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
        className="opacity-40 w-[350px] h-[500px] max-h-[500px] dark:bg-black rounded-lg flex flex-col border border-rose-500/50 bg-rose-500/20 dark:bg-rose-900/20"
      />
    );
  }

  console.log("Tasks:", tasks);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] dark:bg-black rounded-lg flex flex-col border border-rose-500/30 hover:bg-rose-500/5 dark:hover:bg-rose-900/5 hover:border-rose-500/50 transition duration-300 ease-in-out"
    >
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <ReloadIcon className="animate-spin w-8 h-8 text-rose-500" />
          <div className="ml-2">Deleting...</div>
        </div>
      )}

      {/* Column title */}
      {!isLoading && (
        <div
          {...attributes}
          {...listeners}
          onClick={() => setEditMode(true)}
          className="flex items-center justify-between dark:bg-white/10 bg-rose-500/20 text-lg h-[60px] cursor-grab rounded-t-lg p-3 font-regular dark:border-black border-2 border-white hover:bg-rose-500/10 dark:hover:bg-white/5"
        >
          <div className="flex gap-2">
            <Badge
              variant={"kanban"}
              className="flex justify-center items-center"
            >
              {tasks.length}
            </Badge>
            {!editMode && column.title}
            {editMode && (
              <Input
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
                className="text-black dark:text-white focus-visible:text-black focus-visible:ring-rose-500 dark:focus-visible:bg-black"
              />
            )}
          </div>
          <Button
            onClick={() => {
              startTransition(() => deleteColumn(column.id));
            }}
            variant={"kanban"}
          >
            <TrashIcon />
          </Button>
        </div>
      )}

      {/* Column task container */}
      {!isLoading && (
        <ScrollArea
          className="flex flex-grow flex-col p-2"
          thumbClassName="bg-rose-900"
        >
          <div className="space-y-2">
            <SortableContext items={tasksIds}>
              {tasks.map((task) => (
                <KanbanTaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      {/* Column footer */}
      {!isLoading && (
        <div className="flex items-center justify-start w-full">
          <Button
            variant={"kanban"}
            onClick={() => {
              createTask(column.id);
            }}
            className="flex gap-2 justify-start items-center p-2 border-none w-full rounded-t-none active:bg-rose-950"
          >
            <PlusCircledIcon /> Add Task
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ColumnContainer;
