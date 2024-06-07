"use server";
import { validateRequest } from "@/lib/auth";
import { prisma } from "../../prismaClient";
import { redirect } from "next/navigation";

export const getBlogData = async (data: Object) => {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/");
  }

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

    return { success: true, data: postedData };
  } catch (error) {
    return {
      success: false,
      error: { message: "failed to post data" },
    };
  }
};
