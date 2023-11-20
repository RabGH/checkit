"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { Column, Id, Task } from "@/lib/types";
import { generateId } from "@/lib/utils";
import ColumnContainer from "@/components/kanban/column-container";
import KanbanTaskCard from "@/components/kanban/kanban-task-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  CreateKanbanColumn,
  DeleteKanbanColumn,
  getKanbanColumns,
} from "@/actions/kanban-column";
import { CreateKanbanTask, getKanbanTasks } from "@/actions/kanban-task";

interface KanbanBoardProps {
  userId: string;
}

function KanbanBoard({ userId }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, startTransition] = useTransition();

  // Fetch initial data using actions when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedColumns = await getKanbanColumns(userId);
        const convertedColumns = fetchedColumns.map((column) => ({
          ...column,
          createdAt: new Date(column.createdAt),
        }));

        const fetchedTasks = await getKanbanTasks(userId);
        setColumns(convertedColumns);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Error fetching data. Please try again later.",
          variant: "destructive",
        });
      }
    }

    fetchData();
  }, [userId]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  async function createNewColumn() {
    try {
      const columnToAdd: Column = await CreateKanbanColumn({
        id: generateId(),
        title: `Column ${columns.length + 1}`,
        userId: userId,
      });
      toast({
        title: "Success",
        description: `Column created. ${columnToAdd.createdAt?.toLocaleDateString(
          "en-US"
        )}`,
        variant: "default",
      });
      setColumns([...columns, columnToAdd]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  async function deleteColumn(id: Id) {
    try {
      await DeleteKanbanColumn(Number(id));
      toast({
        title: "Success",
        description: "Column deleted.",
        variant: "default",
      });
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((task) => task.kanbanColumnId !== id);
      setTasks(newTasks);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  async function createTask(kanbanColumnId: number) {
    try {
      const newTask: Task = await CreateKanbanTask({
        id: generateId(),
        kanbanColumnId,
        content: `Task ${tasks.length + 1}`,
        userId: userId,
      });
      toast({
        title: "Success",
        description: `Task created. ${newTask.createdAt?.toLocaleDateString(
          "en-US"
        )}`,
        variant: "default",
      });
      setTasks([...tasks, newTask]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    // console.log("Drag Start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeTaskId
        );
        const overTaskIndex = tasks.findIndex((task) => task.id === overTaskId);

        tasks[activeTaskIndex].kanbanColumnId =
          tasks[overTaskIndex].kanbanColumnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeTaskId
        );

        tasks[activeTaskIndex].kanbanColumnId = Number(overTaskId);

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  }

  return (
    <ScrollArea className="mx-auto flex min-h-[65vh] items-center px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                startTransition(() => createNewColumn());
              }}
              variant={"kanban"}
              className=" justify-start w-[200px] gap-2"
            >
              <PlusCircledIcon /> Add Column
            </Button>
            <div className="flex flex-row gap-4">
              {isLoading &&
                columns.map((col) => (
                  <Card
                    key={col.id}
                    className="w-[350px] h-[500px] max-h-[500px] dark:bg-black rounded-lg flex flex-col border border-rose-500/50 bg-rose-500/20 dark:bg-rose-900/20"
                  >
                    <div className="flex items-center justify-center h-full w-full">
                      <ReloadIcon className="animate-spin w-8 h-8 text-rose-500" />
                      <div className="ml-2">Creating...</div>
                    </div>
                  </Card>
                ))}
              {!isLoading && (
                <SortableContext items={columnsId}>
                  {columns.map((col) => (
                    <ColumnContainer
                      key={col.id}
                      column={col}
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      tasks={tasks.filter(
                        (task) => task.kanbanColumnId === col.id
                      )}
                      updateTask={updateTask}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </div>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(
                    (task) => task.kanbanColumnId === activeColumn.id
                  )}
                  updateTask={updateTask}
                />
              )}
              {activeTask && (
                <KanbanTaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
      <ScrollBar orientation="horizontal" className="text-rose-900" />
    </ScrollArea>
  );
}

export default KanbanBoard;
