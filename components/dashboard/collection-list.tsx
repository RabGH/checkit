import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SadFace from "@/components/icons/sad-face";

export default async function CollectionList() {
  const user = await currentUser();
  const collections = await prismadb.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <Alert className="mt-10">
        <SadFace />
        <AlertTitle>No Collections</AlertTitle>
        <AlertDescription>Create a collection to get started</AlertDescription>
      </Alert>
    );
  }
}
