import * as z from "zod";

export const CreateKanbanColumnValidator = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character(s)",
  }),
});

export type CreateKanbanColumnValidatorType = z.infer<
  typeof CreateKanbanColumnValidator
>;
