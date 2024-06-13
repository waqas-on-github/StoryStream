"use server";
import { sleep } from "@/lib/utils";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";

export const bookmarkArticle = async (articleId: string) => {
  const { user } = await CheckAuth();

  try {
    // check article exists if exists grab article id and add id to book mark table
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

    // check is this same  article bookmarked by same user before
    const isBookmarkedBefore = await prisma.bookmark.findFirst({
      where: {
        articleId: articleExists.id,
        userId: user.id,
      },
    });

    if (isBookmarkedBefore) {
      return {
        success: false,
        error: { message: "already  added in your  bookmarks " },
      };
    }

    const addToBookmark = await prisma.bookmark.create({
      data: {
        articleId: articleExists.id,
        userId: user.id,
      },
    });

    if (!addToBookmark) {
      return {
        success: false,
        error: { message: "failed to add in bookmarks " },
      };
    }
    revalidatePath("/profile/bookmarks", "page");
    return {
      success: true,
      data: addToBookmark,
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};


export const checkArticleExists = async (articleId: string) => {
  try {
    const articleExists = await prisma.articles.findUnique({
      where: { id: articleId },
    });

    if (!articleExists) {
      return {
        success: false,
        error: { message: "article dose not exists" },
      };
    }

    return {
      success: true,
      data: articleExists,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: "article dose not exists" },
    };
  }
};