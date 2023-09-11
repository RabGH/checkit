import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateCollectionValidator,
  CreateCollectionValidatorType,
} from "@/validators/create-collection-validator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectionColor, CollectionColors } from "@/util/constants";
import { cn } from "@/lib/utils";

interface CreactCollectionSiderbarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCollectionSidebar = ({
  open,
  onOpenChange,
}: CreactCollectionSiderbarProps) => {
  const form = useForm<CreateCollectionValidatorType>({
    defaultValues: {},
    resolver: zodResolver(CreateCollectionValidator),
  });

  const onSubmit = (data: CreateCollectionValidatorType) => {
    console.log("SUBMITTED", data);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <div className="flex flex-col items-center">
            <SheetTitle>Add new collection</SheetTitle>
            <SheetDescription>Collections group your tasks</SheetDescription>
          </div>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white 
                              focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset 
                              dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select a collection color</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionSidebar;
