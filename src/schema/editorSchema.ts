import { z } from "zod";

export const editorSchema = z.object({
  title: z.string({ message: "title is required" }),
  content: z.string({ message: "content is required" }),
  // featureImage: z.any().optional(),
});
