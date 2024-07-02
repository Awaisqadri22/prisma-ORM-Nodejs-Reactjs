import z from "zod";
import { ZodError } from "zod";

export const signupInput = z.object({
  username: z.string().email({ message: "In-Valid Email address" }),
  password: z
    .string()
    .min(6, { message: "  Password must be 6 charcters long " })
    .max(10, { message: "Password must not be more than 10 charcters" }),
  name: z.string().optional(),
});

export const signinInput = z.object({
  username: z.string().email({ message: "In-Valid Email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters long..." }),
});

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type UpdatePostType = z.infer<typeof updatePostInput>;
export type CreatePostType = z.infer<typeof createPostInput>;
