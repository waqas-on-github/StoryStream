"use server";
import { z } from "zod";
import { checkArticleExists } from "./bookmarkArticle";
import { CheckAuth } from "./checkAuth";
import { prisma } from "../../prismaClient";
import { hasAlreadyCommented } from "@/utils/dataFetcher";
import { revalidatePath } from "next/cache";

type commentType = {
  commentId: string;
  comment: string;
  slug: string;
};

const commentScehema = z.object({
  comment: z.string().trim().min(3).max(50),
  commentId: z.string(),
});

export const addComment = async (data: commentType) => {
  try {
    // check user is authed
    const { user } = await CheckAuth();
    // validate user data
    const isValidCommentData = commentScehema.safeParse(data);

    if (isValidCommentData.error || !isValidCommentData.success) {
      return {
        success: false,
        error: { message: isValidCommentData.error.message },
      };
    }
    // check article exists
    const articleExists = await checkArticleExists(data.slug);
    if (articleExists.error || !articleExists.success) {
      return {
        success: false,
        error: { message: articleExists.error?.message },
      };
    }

    // check comment exists

    // update comment
    revalidatePath(`/article/${data.slug}`, "page");

    return {
      success: true,
      data: "updatedComment",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { message: "failed to add comment" },
    };
  }
};
