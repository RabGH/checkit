"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { format } from "date-fns";

import getExpirationColor from "@/components/dashboard/task/task-expiration-color";
import { Task } from "@prisma/client";
import { SetTaskToDone } from "@/actions/task";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex gap-2 items-start">
      <Checkbox
        id={task.id.toString()}
        checked={task.done}
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
  );
}

export default TaskCard;
