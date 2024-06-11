"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";

export const DeleteSingleArticle = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const { user } = await CheckAuth();
  // check userid user is providing is same as logged in user

  if (user.id && userId === user.id) {
    try {
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
