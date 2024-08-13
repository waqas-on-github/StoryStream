import "server-only";
import { CheckAuth } from "@/actions/checkAuth";
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
      take: 2, // user can only  add 2 comments per article
    });

    if (!alreadyCommented) {
      return { success: false, error: { message: "failed to find comments" } };
    }
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

export const getBookmarks = async () => {
  try {
    const { user } = await CheckAuth();

    let myBookmarks;
    if (user && user.id) {
      myBookmarks = await prisma.bookmark.findMany({
        where: { userId: user?.id },
      });
    }

    return {
      success: true,
      data: myBookmarks,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: "faild to get bookmarks" },
    };
  }
};

export const getWritings = async () => {
  try {
    const { user } = await CheckAuth();

    if (user && user.id) {
      const myWritings = await prisma.articles.findMany({
        where: { userId: user?.id },
      });

      return {
        success: true,
        data: myWritings,
      };
    }
  } catch (error) {
    return {
      succeess: false,
      error: { message: "failed to get your articles " },
    };
  }
};

export const getArticles = async ({
  searchParams,
}: {
  searchParams: { query: string; date: "asc" | "desc"; page: string };
}) => {
  try {
    const articles = await prisma?.articles?.findMany({
      where: { title: { contains: searchParams?.query || "" } },
      orderBy: { createdAt: searchParams?.date || "asc" },
      include: {
        user: { include: { profile: { select: { username: true } } } },

        votes: { select: { voteType: true } },
      },
      take: 6,
      skip: Number(searchParams.page) || 0,
    });

    return {
      success: true,
      data: articles,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: "failed to get articles " },
    };
  }
};

export const getProfile = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    return {
      success: true,
      data: profile,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: "failed to get profile " },
    };
  }
};
