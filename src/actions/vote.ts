"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { removeUpvote } from "./removeUpvote";
import { voteType } from "@/types/commonTypes";

export const addVote = async ({ articleId, voteType }: voteType) => {
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
        voteType: voteType,
      },
    });

    if (hasVotedBefore) {
      // call removeUpvote server action
      const result = await removeUpvote({
        voteId: hasVotedBefore.id,
        voteType: voteType,
      });
      if (result.data && result.success) {
        return {
          success: true,
          data: result,
          message: ` ${voteType} removed`,
        };
      }
    }

    // add upvote
    const addUpVote = await prisma.vote.create({
      data: {
        voteType: voteType,
        userId: user.id,
        articleId: articleId,
      },
    });

    if (!addUpVote) {
      return {
        success: false,
        error: { message: `failed to ${voteType}` },
      };
    }

    revalidatePath("/article", "page");
    return {
      success: true,
      data: addUpVote,
      message: `${voteType} added`,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: { message: `failed  to  ${voteType} : Prisma error ` },
    };
  }
};
