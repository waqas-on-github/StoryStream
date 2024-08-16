"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { deleteArticleType } from "@/types/commonTypes";

export const DeleteSingleArticle = async ({
  id,
  userId,
}: deleteArticleType) => {
  const { user } = await CheckAuth();
  // check userid user is providing is same as logged in user

  if (user.id && userId === user.id) {
    try {
      // before deleting article we need to delete all views of article
      await prisma.views.deleteMany({
        where: { articleId: id },
      });
      // deleting  comments assocated with article
      await prisma.comments.deleteMany({
        where: { articleId: id },
      });
      // delete if this article is bookmarked
      await prisma.bookmark.deleteMany({
        where: { articleId: id },
      });
      // delete if article is voted
      await prisma.vote.deleteMany({
        where: { articleId: id },
      });

      const deleteArticle = await prisma.articles.delete({
        where: {
          id: id,
          userId: user?.id,
        },
      });

      if (!deleteArticle) {
        return {
          success: false,
          error: { message: "failed to delete article " },
        };
      }
      revalidatePath("/profile/writings", "page");

      return {
        success: true,
        data: deleteArticle,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: { message: "failed to delete article " },
      };
    }
  }
  revalidatePath("/profile/writings", "page");
};
