import "server-only";
import { prisma } from "../../prismaClient";
import { getCloudniry } from "@/config/cloudinaryConfig";
import { CheckAuth } from "@/actions/checkAuth";

interface UploadResult {
  url: string;
}
export const getSingleUser = async (userId: string) => {
  if (!userId) return { success: false, error: { message: "user not exists" } };

  try {
    const userData = await prisma.user.findFirst({
      where: { id: userId },
      include: { profile: { select: { username: true, profilePic: true } } },
    });
    if (!userData)
      return { success: false, error: { message: "user not exists" } };

    return { success: true, data: userData };
  } catch (error) {
    console.error(error);
    return { success: false, error: { message: "prisma catch error " } };
  }
};

export async function uploadImage(file: File) {
  const cloudinary = getCloudniry();
  const { user } = await CheckAuth();
  const profile = await getProfileByUserId(user.id);

  try {
    const arrayBuffer = await file.arrayBuffer();

    const buffer = new Uint8Array(arrayBuffer);
    const result = await new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error || result === undefined) {
            reject(error || new Error("Upload result is undefined."));
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });

    return result.url;
  } catch (error) {
    return null;
  }
}
export const deleteImage = async (imageUrl: string) => {
  const cloudniary = getCloudniry();

  try {
    const deleted = await cloudniary.uploader.destroy(imageUrl);
    console.log(deleted);

    return { success: true, data: deleted };
  } catch (error) {
    return { success: false, error: { message: "failed to delete image " } };
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    return { success: true, data: profile };
  } catch (error) {
    return { success: false, error: { message: "faile to get profile " } };
  }
};