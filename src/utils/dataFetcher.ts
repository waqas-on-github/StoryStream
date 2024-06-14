import { prisma } from "../../prismaClient";

export const hasAlreadyCommented = async ({
  slug,
  userId,
}: {
  slug: string;
  userId: string;
}) => {
  try {
    const alreadyCommented = await prisma.comments.findMany({
      where: {
        userId: userId,
        articleId: slug,
      },
      take: 2, // user can on add 2 comments per article
    });

    if (!alreadyCommented)
      return { success: false, error: { message: "failed to find comments" } };
    return { success: true, data: alreadyCommented };
  } catch (error) {
    return { success: false, error: { message: "failed to find comments" } };
  }
};

export const getSingleArticle = async (slug: string) => {
  try {
    const SingleArticle = await prisma.articles.findUnique({
      where: { id: slug },
    });

    return { success: true, data: SingleArticle };
  } catch (error) {
    console.log(error);
    return { success: false, error: { message: "failed to get article " } };
  }
};

export const getComments = async () => {
  try {
    const comments = await prisma.comments.findMany({
      include: { user: true },
    });

    return { success: true, data: comments };
  } catch (error) {
    console.log(error);
    return { success: false, error: { message: "failed to get comments " } };
  }
};

export const isMyComment = async (userId: string) => {
  try {
    const isMyComment = await prisma.comments.findMany({
      where: { userId: userId },
    });

    return { success: true, data: isMyComment };
  } catch (error) {
    return { success: false, error: { message: "comment not found " } };
  }
};
