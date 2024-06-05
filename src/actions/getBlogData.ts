"use server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "../../prismaClient";

export const getBlogData = async (data: Object) => {
  console.log("getBlogData called...............");
  const { user } = await validateRequest();
  let postedData;
  try {
    // Convert data to a JSON string and write to file
    if (user) {
      postedData = await prisma.articles.create({
        data: {
          text: JSON.stringify(data),
          userId: user?.id,
          featureImage: "waqas",
        },
      });
    }
    if (!postedData) {
      return {
        success: false,
        error: { message: "failed to post data" },
      };
    }

    return postedData;
  } catch (error) {
    // Log any error that occurs during the write operation
    return {
      success: false,
      error: { message: "failed to post data" },
    };
  }
};
