"use server";

import { loginSchema } from "@/schema/authSchema";
import { z } from "zod";
import { prisma } from "../../prismaClient";
import argon2 from "argon2";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { errorResponceType, successResponceType } from "./signup";
import { User } from "@prisma/client";

export const signIn = async (
  inputData: z.infer<typeof loginSchema>
): Promise<successResponceType<User> | errorResponceType | undefined> => {
  //check email existance
  const user = await checkUserExistance(inputData?.email);

  if (user.error && !user.success)
    return { success: false, error: { message: user.error.message } };

  //we reached here it means we got user so lets verify password

  if (user && user.data?.password) {
    const verifiedPass = await argon2.verify(
      user?.data?.password,
      inputData.password
    );
    if (!verifiedPass) {
      return { success: false, error: { message: "invalid crediantials " } };
    }
    const session = await lucia.createSession(user?.data?.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
      data: user?.data,
    };
  }

  // check session existance
};

const checkUserExistance = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return { success: false, error: { message: "user not found" } };

    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: { message: "db query error " },
    };
  }
};
