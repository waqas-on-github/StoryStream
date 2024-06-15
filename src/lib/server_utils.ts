import "server-only";
import { prisma } from "../../prismaClient";
import { getCloudniry } from "@/config/cloudinaryConfig";

interface UploadResult {
  url: string;
}
export const getSingleUser = async (userId: string) => {
  if (!userId) return { success: false, error: { message: "user not exists" } };

  try {
    const userData = await prisma.user.findFirst({
      where: { id: userId },
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
