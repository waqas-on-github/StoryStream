"use server";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export const CheckAuth = async () => {
  const { user, session } = await validateRequest();
  if (!user) {
    redirect("/");
  }

  return {
    user,
    session,
  };
};
