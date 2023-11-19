import * as z from "zod";

export const CreateKanbanTaskValidator = z.object({
  kanbanColumnId: z.number().nonnegative(),
  content: z.string().min(3, {
    message: "Task content must be at least 3 characters",
  }),
});

export type CreateKanbanTaskValidatorType = z.infer<
  typeof CreateKanbanTaskValidator
>;