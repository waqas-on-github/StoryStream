"use server";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { removeUpvote } from "./removeUpvote";

export const addVote = async (articleId: string) => {
  // check user exists and logged in in application
  const { user } = await CheckAuth();

  // check article exists
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
    // check use have upvoted before on same article if user have voted then unvote

    const hasVotedBefore = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        articleId: articleId,
        voteType: "UPVOTE",
      },
    });

    if (hasVotedBefore) {
      // call removeUpvote server action
      const result = await removeUpvote({
        voteId: hasVotedBefore.id,
        voteType: "UPVOTE",
      });
      if (result.data && result.success) {
        return;
      }
    }

    // add upvote
    const addUpVote = await prisma.vote.create({
      data: {
        voteType: "UPVOTE",
        userId: user.id,
        articleId: articleId,
      },
    });

    if (!addUpVote) {
      return {
        success: false,
        error: { message: "failed  upvoted " },
      };
    }

    return {
      success: true,
      data: addUpVote,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: { message: "failed  upvoted  : Prisma error " },
    };
  }
};
