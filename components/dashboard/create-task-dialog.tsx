"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Collection } from "@prisma/client";
import { CollectionColor, CollectionColors } from "@/util/constants";
import {
  CreateTaskValidator,
  CreateTaskValidatorType,
} from "@/validators/create-task-validator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Popover } from "../ui/popover";

interface CreateTaskDialogProps {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
}

function CreateTaskDialog({
  open,
  collection,
  setOpen,
}: CreateTaskDialogProps) {
  const form = useForm<CreateTaskValidatorType>({
    resolver: zodResolver(CreateTaskValidator),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  const onSubmit = async (data: CreateTaskValidatorType) => {
    console.log("SUBMITTED", data);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            Add task to collection:
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a task to collection, add as many as you want.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Type your task here..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire Date</FormLabel>
                    <FormDescription>
                      When will the task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover></Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
