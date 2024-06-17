"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { deleteImage, uploadImage } from "@/lib/server_utils";
import { revalidatePath } from "next/cache";

export async function createProfile(formData: FormData) {
  const { user } = await CheckAuth();
  const profilePic = formData.get("file") as File;
  const username = formData.get("username") as string;
  let url;
  try {
    url = await uploadImage(profilePic);

    if (user.id) {
      const profile = await prisma.profile.create({
        data: {
          profilePic: url || null,
          userId: user.id,
          username: username,
        },
      });

      if (!profile && url) {
        await deleteImage(url);
        return {
          success: false,
          error: { message: "filed to create profile " },
        };
      }

      revalidatePath("profile", "page");
      return {
        success: true,
        data: profile,
      };
    }
  } catch (error) {
    console.log(error);

    // ckeck error type if its prisma error delete uploaded image
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      url && (await deleteImage(url));
    }

    return {
      success: false,
      error: { message: "filed to create profile:) " },
    };
  }
}

