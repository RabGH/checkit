import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SadFace from "@/components/icons/sad-face";
import CreateCollectionButton from "@/components/dashboard/create-collection-button";

export default async function CollectionList() {
  const user = await currentUser();
  const collections = await prismadb.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>No Collections</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionButton />
      </div>
    );
  }

  return (
    <div>
      Collections: {collections.length}
      <CreateCollectionButton />
    </div>
  );
}
