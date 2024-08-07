"use client";

import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(2).max(50),
  password: z.string(),
});
