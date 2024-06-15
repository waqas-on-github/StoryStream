import { z } from "zod";

// -------------------------------auth schema ------------------------------
// Shared base schema for email and password
const baseSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string({ message: "password is required" })
    .min(8, { message: "at least 8 characters required and max 32" }),
});

// Signup schema with confirmation password
export const signupSchema = baseSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
  });

// Login schema without confirmation password
export const loginSchema = baseSchema;

export type userType = z.infer<typeof signupSchema>;

// -----------------------------comment schema --------------------------------
export const commentScehema = z.object({
  comment: z.string().trim().min(3).max(50),
});

export const UpdateCommentScehema = z.object({
  comment: z.string().trim().min(3).max(50),
  commentId: z.string(),
  slug: z.string(),
});

// --------------------------profile schema ------------------------------------

export const formSchema = z.object({
  username: z.string().min(3).max(15).trim(),
  // profilePic: z
  //   .instanceof(FileList)
  //   .optional()
  //   .refine((files) => files?.length === 1, {
  //     message: "You must upload exactly one file",
  //   })
  //   .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
  //     // max 5MB
  //     message: "File size must be less than 5MB",
  //   })
  //   .refine((files) => ["image/jpeg", "image/png"].includes(files[0]?.type), {
  //     message: "Only JPEG and PNG files are allowed",
  //   }),
});

// ----------------------------editor schema ----------------------

export const editorSchema = z.object({
  title: z.string({ message: "title is required" }),
  content: z.string({ message: "content is required" }),
  // featureImage: z.any().optional(),
});
