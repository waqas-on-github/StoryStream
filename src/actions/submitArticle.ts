"use server";
import { prisma } from "../../prismaClient";
import { sleep } from "@/lib/utils";
import { CheckAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";

export const SubmitArticle = async (data: string) => {
  const parsedData = JSON.parse(data);

  const { user } = await CheckAuth();

  let postedData;
  try {
    if (user) {
      postedData = await prisma.articles.create({
        data: {
          title: parsedData.title,
          text: JSON.stringify(parsedData.content),
          userId: user?.id,
          // default image later it'll be dynamic
          featureImage: parsedData?.featureimageUrl,
        },
      });
    }
    if (!postedData) {
      return {
        success: false,
        error: { message: "failed to post data" },
      };
    }
    revalidatePath("/articles", "page");

    return { success: true, data: postedData };
  } catch (error) {
    return {
      success: false,
      error: { message: "failed to post data" },
    };
  }
};
