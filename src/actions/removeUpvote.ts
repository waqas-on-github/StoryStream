"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";

export const removeUpvote = async ({
  voteId,
  voteType,
}: {
  voteId: string;
  voteType: "UPVOTE" | "DOWNVOTE";
}) => {
  // check user existance
  // vote id

  try {
    const { user } = await CheckAuth();

    const removedVote = await prisma.vote.delete({
      where: {
        id: voteId,
        userId: user.id,
        voteType: voteType,
      },
    });

    revalidatePath("/article", "page");

    if (!removedVote) {
      return {
        success: false,
        error: { message: "failed to remove vote" },
      };
    }
    // if we successed to remove vote
    return {
      success: true,
      data: removedVote,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: { message: "failed to remove vote" },
    };
  }
};
