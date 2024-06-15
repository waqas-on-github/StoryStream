"use server";
import { checkArticleExists } from "./bookmarkArticle";
import { CheckAuth } from "./checkAuth";
import { prisma } from "../../prismaClient";
import { revalidatePath } from "next/cache";
import { UpdateCommentScehema } from "@/schema/schmea";
import { z } from "zod";

export const updateComment = async (
  data: z.infer<typeof UpdateCommentScehema>
) => {
  try {
    // check user is authed
    const { user } = await CheckAuth();
    // validate user data
    const isValidCommentData = UpdateCommentScehema.safeParse(data);

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
    const commentExists = await prisma.comments.findUnique({
      where: { id: data.commentId },
    });

    if (!commentExists) {
      return { sucesss: false, error: { message: "comment not found " } };
    }

    // update comment
    const updatedComment = await prisma.comments.update({
      where: { id: data.commentId, userId: user.id, articleId: data.slug },
      data: { comment: data.comment },
    });

    if (!updatedComment) {
      return {
        sucesss: false,
        error: { message: "failed to update comment " },
      };
    }

    revalidatePath(`/article/${data.slug}`, "page");

    return {
      success: true,
      data: updatedComment,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { message: "failed to update  comment" },
    };
  }
};
