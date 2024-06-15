"use server";
import { prisma } from "../../prismaClient";
import { sleep } from "@/lib/utils";
import { CheckAuth } from "./checkAuth";

export const SubmitArticle = async (data: string) => {

  const parsedData = JSON.parse(data);
  const { user } = await CheckAuth();

  let postedData;
  try {
    if (user) {
      await sleep(1000);
      postedData = await prisma.articles.create({
        data: {
          title: parsedData.title,
          text: JSON.stringify(parsedData.content),
          userId: user?.id,
          // default image later it'll be dynamic
          featureImage:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
