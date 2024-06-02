"use server";

import { signupSchema, userType } from "@/schema/authSchema";
import argon2 from "argon2";
import { prisma } from "../../prismaClient";
import { User } from "@prisma/client";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

export type errorResponceType = {
  success: false;
  error: { message: string };
};

export type successResponceType<T> = {
  success: true;
  data: T;
};

export const signUp = async (inputData: z.infer<typeof signupSchema>) => {
  // validate data
  const isvalidData = signupSchema.safeParse(inputData);

  if (!isvalidData || isvalidData.error || !isvalidData.success) {
    return {
      success: false,
      error: { message: "failed to validate data" },
    };
  }

  // hash user provide password
  const hashePass = await argon2.hash(isvalidData?.data?.password);

  // insert data into db
  const user = await insertIntoDb({
    email: isvalidData.data.email,
    password: hashePass,
  });

  // after nerrowing down now user only have error data;
  if (user.error && !user.success) return user;

  // if insertion get successfull create session for user
  // save session id in cookies
  let session: Awaited<ReturnType<typeof createSessionAndSetCookies>>;
  if (user && user.success && user.data) {
    session = await createSessionAndSetCookies(user.data);

    if (!session) {
      // delete db record
    }

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: { session },
    };
  }

  // after nerrowing down now user only have success data
  if (user?.data) return user;

  // send email for email verification
};

const insertIntoDb = async (data: Omit<userType, "confirmPassword">) => {
  try {
    const user = await prisma.user.create({
      data: { ...data },
    });

    if (!user) {
      return {
        success: false,
        error: { message: "failed to create account" },
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    if (error.code === "P2002")
      return {
        success: false,
        error: { message: "email already exists" },
      };

    return {
      success: false,
      error: { message: "db insertion error" },
    };
  }
};

const createSessionAndSetCookies = async (user: User) => {
  try {
    const session = await lucia.createSession(user.id, {});
    return session;
  } catch (error: any) {
    throw new Error(error.message, error.stack);
  }
};
