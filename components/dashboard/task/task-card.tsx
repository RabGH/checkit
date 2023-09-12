"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { format } from "date-fns";

import getExpirationColor from "@/components/dashboard/task/task-expiration-color";
import { Task } from "@prisma/client";
import { DeleteTask, SetTaskToDone } from "@/actions/task";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TrashIcon } from "@radix-ui/react-icons";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const removeTask = async () => {
    try {
      await DeleteTask(task.id);
      toast({
        title: "Success",
        description: "Task Deleted.",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, can not delete task.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex gap-2 items-start">
        <Checkbox
          id={task.id.toString()}
          checked={task.done}
          disabled={task.done || isLoading}
          onCheckedChange={() => {
            startTransition(async () => {
              await SetTaskToDone(task.id);
              router.refresh();
            });
          }}
          className="w-5 h-5"
        />
        <label
          htmlFor={task.id.toString()}
          className={cn(
            `text-sm font-medium leading-none peer-disabled:cursor-not-allowed
              peer-disabled:opacity-70 decoration-1 dark:decoration-white`,
            task.done && "line-through"
          )}
        >
          {task.content}{" "}
          {task.expiresAt && (
            <p
              className={cn(
                "text-xs text-neutral-500 dark:text-neutral-400",
                getExpirationColor(task.expiresAt)
              )}
            >
              {format(task.expiresAt, "dd/MM/yyyy")}
            </p>
          )}
        </label>
      </div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <TrashIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permenantly delete a task, this action can not be
              undone.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  startTransition(removeTask);
                }}
                className="bg-red-700 text-white hover:bg-red-900"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default TaskCard;
