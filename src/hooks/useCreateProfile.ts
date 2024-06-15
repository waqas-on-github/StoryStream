"use client";
import { createProfile } from "@/actions/createProfile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProfile = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("profile createed ");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.message("failed to create profile");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
