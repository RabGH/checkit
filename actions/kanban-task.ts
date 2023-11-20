"use server";

import { currentUser } from "@clerk/nextjs";

import { CreateKanbanTaskValidatorType } from "@/validators/create-kanban-task-validator";
import prismadb from "@/lib/prismadb";

export async function CreateKanbanTask(data: CreateKanbanTaskValidatorType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.kanbanTask.create({
    data: {
      userId: user.id,
      content: data.content,
      KanbanColumn: {
        connect: {
          id: data.kanbanColumnId,
        },
      },
    },
  });
}

export async function DeleteKanbanTask(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.kanbanTask.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}

export async function UpdateKanbanTask(
  id: number,
  content: string,
  columnId?: number
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const updateData: { content: string; columnId?: number } = { content };

  if (columnId !== undefined) {
    updateData.columnId = columnId;
  }

  return await prismadb.kanbanTask.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: updateData,
  });
}

export async function getKanbanTasks(userId: string) {
  return await prismadb.kanbanTask.findMany({
    where: {
      userId: userId,
    },
    include: {
      KanbanColumn: true,
    },
  });
}
