import * as z from "zod";

export const CreateTaskValidator = z.object({
  collectionId: z.number().nonnegative(),
  content: z.string().min(8, {
    message: "Task content must be at least 9 characters",
  }),
  expiresAt: z.date().optional(),
});

export type CreateTaskValidatorType = z.infer<typeof CreateTaskValidator>;
