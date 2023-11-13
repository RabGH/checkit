"use client";

import React, { useState } from "react";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Column, Id } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlusIcon from "@/components/icons/plus-icon";

interface ColumnContainer {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: string) => void;
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
}: ColumnContainer) {
  const [editMode, setEditMode] = useState(false);

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
        className="opacity-40 bg-rose-500/20 dark:bg-black w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col border border-rose-500/30 hover:bg-rose-500/5 dark:hover:bg-gray-900/5"
      ></Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="dark:bg-black w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col border border-rose-500/30 hover:bg-rose-500/5 dark:hover:bg-gray-900/5"
    >
      {/* Column title */}
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
            0
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
              className="text-black focus-visible:ring-rose-500 focus-visible:bg-white border-rose-500/50 bg-white/80"
            />
          )}
        </div>
        <Button onClick={() => deleteColumn(column.id)} variant={"kanban"}>
          <TrashIcon />
        </Button>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow p-5">Content</div>
      {/* Column footer */}
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
    </Card>
  );
}

export default ColumnContainer;
