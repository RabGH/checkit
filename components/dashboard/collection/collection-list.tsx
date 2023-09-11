import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SadFace from "@/components/icons/sad-face";
import CreateCollectionButton from "@/components/dashboard/collection/collection-create-button";
import CollectionCard from "@/components/dashboard/collection/collection-card";

export default async function CollectionList() {
  const user = await currentUser();
  const collections = await prismadb.collection.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: true,
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
    <>
      <CreateCollectionButton />
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
