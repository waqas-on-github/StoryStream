"use server";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { uploadImage } from "@/lib/server_utils";

export async function createProfile(formData: FormData) {
  const { user } = await CheckAuth();
  const profilePic = formData.get("file") as File;
  const username = formData.get("username") as string;

  try {
    const url = await uploadImage(profilePic);
    if (user.id) {
      const profile = await prisma.profile.create({
        data: {
          profilePic: url || null,
          userId: user.id,
          username: username,
        },
      });

      if (!profile) {
        // delete uploaded image
        return {
          success: false,
          error: { message: "filed to create profile " },
        };
      }

      return {
        success: true,
        data: profile,
      };
    }
  } catch (error) {
    console.error(error);
    // ckeck error type if its prisma error delete uploaded image
    return {
      success: false,
      error: { message: "filed to create profile:) " },
    };
  }
}
