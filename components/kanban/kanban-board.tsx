"use client";

import React, { useMemo, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Column, Id, Task } from "@/lib/types";
import { generateId } from "@/lib/utils";
import ColumnContainer from "@/components/kanban/column-container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    setColumns(columns.filter((col) => col.id !== id));
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function onDragStart(event: DragStartEvent) {
    console.log("Drag Start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
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

  return (
    <ScrollArea className="mx-auto flex min-h-[65vh] items-center px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                createNewColumn();
              }}
              variant={"kanban"}
              className=" justify-start w-[200px] gap-2"
            >
              <PlusCircledIcon /> Add Column
            </Button>
            <div className="flex flex-row gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter(task => task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(task => task.columnId === col.id)}
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
