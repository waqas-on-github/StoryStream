"use server";

import { uploadImage } from "@/lib/server_utils";

export const uploadFeatureImage = async (formData: FormData) => {
  const featureImage = formData.get("featureImage") as File;
  let url;
  try {
    url = await uploadImage(featureImage);
    return {
      success: true,
      data: url,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: { message: "failed to upload image " },
    };
  }
};
