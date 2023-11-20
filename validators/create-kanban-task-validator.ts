import * as z from "zod";

export const CreateKanbanTaskValidator = z.object({
  kanbanColumnId: z.number(),
  content: z.string().min(3, {
    message: "Task content must be at least 3 characters",
  }),
  id: z.number(),
});

export type CreateKanbanTaskValidatorType = z.infer<
  typeof CreateKanbanTaskValidator
>;
