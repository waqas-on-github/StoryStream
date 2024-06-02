import "server-only";
import { prisma } from "../../prismaClient";

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
