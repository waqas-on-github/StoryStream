"use server";
import { z } from "zod";
import { checkArticleExists } from "./bookmarkArticle";
import { CheckAuth } from "./checkAuth";
import { prisma } from "../../prismaClient";
import { sleep } from "@/lib/utils";

type commentType = {
  slug: string;
  comment: string;
};

const commentScehema = z.object({
  comment: z.string().trim().min(5).max(50),
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
    // add comment
    await sleep(3000);
    const comment = await prisma.comments.create({
      data: {
        userId: user.id,
        articleId: data.slug,
        comment: isValidCommentData.data.comment,
      },
    });

    if (!comment) {
      return {
        success: false,
        error: { message: "failed to add comment" },
      };
    }

    return {
      success: true,
      data: comment,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { message: "failed to add comment" },
    };
  }
};
