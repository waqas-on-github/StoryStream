"use server";

import { deleteImage } from "@/lib/server_utils";
import { prisma } from "../../prismaClient";
import { CheckAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";

export async function deleteProfile(profileId: string) {
  const { user } = await CheckAuth();

  // check profile exists
  try {
    const isProfileExists = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (isProfileExists && isProfileExists.profilePic) {
      await deleteImage(isProfileExists.profilePic);
    }

    const deletedProfile = await prisma.profile.delete({
      where: { id: profileId },
    });

    revalidatePath("/profile", "page");
    return {
      success: true,
      data: deletedProfile,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: "failed to delete profile " },
    };
  }
}
