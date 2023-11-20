"use server";

import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

import { CreateKanbanColumnValidatorType } from "@/validators/create-kanban-column-validator";

export async function CreateKanbanColumn(
  form: CreateKanbanColumnValidatorType
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.kanbanColumn.create({
    data: {
      userId: user.id,
      title: form.title,
    },
  });
}

export async function DeleteKanbanColumn(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.kanbanColumn.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}

export async function UpdateKanbanColumn(id: number, title: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.kanbanColumn.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      title: title,
    },
  });
}

export async function getKanbanColumns() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  return await prismadb.kanbanColumn.findMany({
    where: {
      userId: user.id,
    },
    include: {
      tasks: true,
    },
    orderBy: {
      order: "asc",
    },
  });
}

export async function updateKanbanColumnOrder(newColumnOrder: number[]) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  for (let i = 0; i < newColumnOrder.length; i++) {
    const id = newColumnOrder[i];

    await prismadb.kanbanColumn.update({
      where: { id },
      data: { order: i },
    });
  }
}
