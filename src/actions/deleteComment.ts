"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { isMyComment } from "@/utils/dataFetcher";
import { deleteCommentType } from "@/types/commonTypes";

export const deleteComment = async ({
  commentId,
  articleId,
}: deleteCommentType) => {
  try {
    // check user exists
    const { user } = await CheckAuth();
    // check this comment is by user
    const myComment = await isMyComment(user?.id);

    if (myComment.error || !myComment.success) {
      return myComment;
    }

    const deletedComment = await prisma.comments.delete({
      where: { id: commentId, userId: user.id, articleId: articleId },
    });
    if (!deletedComment) {
      return {
        success: false,
        error: { message: "failed to delete comment......... " },
      };
    }
    revalidatePath(`/article/${articleId}`, "page");
    return { success: true, data: deletedComment };
    // delete comment
  } catch (error) {
    console.log(error);

    return { success: false, error: { message: "failed to delete comment " } };
  }
};
