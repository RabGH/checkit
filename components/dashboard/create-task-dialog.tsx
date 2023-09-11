"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Collection } from "@prisma/client";
import { CollectionColor, CollectionColors } from "@/util/constants";
import { CreateTask } from "@/actions/task";
import {
  CreateTaskValidator,
  CreateTaskValidatorType,
} from "@/validators/create-task-validator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";

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
  const router = useRouter();
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
    try {
      await CreateTask(data);
      toast({
        title: "Success",
        description: "Task created",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Something went wrong, can not create task. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            Add task to collection:{" "}
            <Badge variant="outline" className="ml-2 text-lg">
              <span
                className={cn(
                  "p-[1px] bg-clip-text text-transparent font-bold",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                {collection.name}
              </span>
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Add a task to collection, add as many as you want.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>No date specified.</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            className={cn(
              "w-full",
              CollectionColors[collection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {isLoading && <ReloadIcon className="animate-spin h-4 w-4 ml-2" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;
