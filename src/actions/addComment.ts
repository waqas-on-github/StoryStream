"use server";
import { checkArticleExists } from "./bookmarkArticle";
import { CheckAuth } from "./checkAuth";
import { prisma } from "../../prismaClient";
import { hasAlreadyCommented } from "@/utils/dataFetcher";
import { revalidatePath } from "next/cache";
import { commentScehema } from "@/schema/schmea";

export const addComment = async (data: any) => {
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

    // check user comment limit per article
    const commentLimit = await hasAlreadyCommented({
      slug: data?.slug,
      userId: user.id,
    });

    if (commentLimit.data?.length === 2) {
      return {
        success: false,
        error: { message: "comment limit reached " },
      };
    }
    // add comment
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
    revalidatePath(`/article/${data.slug}`, "page");

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
