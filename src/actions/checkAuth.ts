"use server";
import { validateRequest } from "@/lib/auth";
import { getProfile } from "@/utils/dataFetcher";
import { redirect } from "next/navigation";

export const CheckAuth = async () => {
  const { user, session } = await validateRequest();
  let profile;
  if (user) {
    profile = await getProfile(user?.id);
  }

  if (!user) {
    redirect("/");
  }

  return {
    user,
    session,
    profile,
  };
};
