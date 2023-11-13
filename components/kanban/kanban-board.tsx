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
import { Column, Id } from "@/lib/types";
import { generateId } from "@/lib/utils";
import ColumnContainer from "@/components/kanban/column-container";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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
    <div className="mx-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <Button
              onClick={() => {
                createNewColumn();
              }}
              variant={"kanban"}
              className=" justify-start w-[200px] gap-2"
            >
              <PlusCircledIcon /> Add Column
            </Button>
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
