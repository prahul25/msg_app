import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(), //we can also call it email whatever we like
  password: z.string(),
});
