"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CollectionColor, CollectionColors } from "@/util/constants";
import { Collection, Task } from "@prisma/client";
import { DeleteCollection } from "@/actions/collection";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretUpIcon, CaretDownIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import PlusIcon from "@/components/icons/plus-icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import CreateTaskDialog from "@/components/dashboard/create-task-dialog";

interface CollectionCardProps {
  collection: Collection & {
    tasks: Task[];
  };
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
  const tasks = collection.tasks;
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [isLoading, startTransition] = useTransition();

  const removeCollection = async () => {
    try {
      await DeleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Collection Deleted.",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, can not delete collection.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && <div>No tasks</div>}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={45} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <div key={task.id}>{task.content}</div>
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer
            className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex 
            justify-between items-center"
          >
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to permenantly delete a collection and all
                      it&apos;s tasks, this action can not be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                        className="bg-red-700 text-white hover:bg-red-900"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default CollectionCard;
