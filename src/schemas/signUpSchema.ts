import { string, z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 character")
  .max(10, "Username not be more than 10 character")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: string()
    .min(6, { message: "Password must be atleat 6 character" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Password must contain atleat one uppercase and Integer",
    }),
});
