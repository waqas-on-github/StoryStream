"use server";
import { sleep } from "@/lib/utils";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";
import { unBookmarkArticleType } from "@/types/commonTypes";

export const unBookmarkArticle = async ({
  articleId,
  bookmarkId,
}: unBookmarkArticleType) => {
  const { user } = await CheckAuth();

  try {
    // check article exists if exists grab article id
    const articleExists = await prisma.articles.findUnique({
      where: { id: articleId },
    });

    if (!articleExists) {
      return {
        success: false,
        error: { message: "article dose not exists" },
      };
    }

    await sleep(1000);

    // check is this  article bookmarked ?
    const isBookmarkedBefore = await prisma.bookmark.findFirst({
      where: {
        articleId: articleExists.id,
        userId: user.id,
      },
    });

    if (isBookmarkedBefore) {
      const unBookmark = await prisma.bookmark.delete({
        where: {
          id: bookmarkId,
          articleId: articleExists.id,
          userId: user.id,
        },
      });

      if (!unBookmark) {
        return {
          success: false,
          error: { message: "failed to remove form bookmarks" },
        };
      }

      if (unBookmark) {
        revalidatePath("profile/bookmarks", "page");
        return {
          success: true,
          data: unBookmark,
        };
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
