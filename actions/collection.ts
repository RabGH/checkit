"use server";

import { currentUser } from "@clerk/nextjs";

import { CreateCollectionValidatorType } from "@/validators/create-collection-validator";
import prismadb from "@/lib/prismadb";

export async function CreateCollection(form: CreateCollectionValidatorType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prismadb.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function DeleteCollection(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  return await prismadb.collection.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}
