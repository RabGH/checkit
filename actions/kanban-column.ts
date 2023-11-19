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
