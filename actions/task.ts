"use server";

import { currentUser } from "@clerk/nextjs";

import { CreateTaskValidatorType } from "@/validators/create-task-validator";
import prismadb from "@/lib/prismadb";

export async function CreateTask(data: CreateTaskValidatorType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { content, expiresAt, collectionId } = data;

  return await prismadb.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function SetTaskToDone(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  return await prismadb.task.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      done: true,
    },
  });
}

export async function DeleteTask(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  return await prismadb.task.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}
