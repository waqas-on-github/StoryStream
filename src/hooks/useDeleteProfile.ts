"use client";
import { deleteProfile } from "@/actions/deleteProfile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProfile = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("profile deleted successfully  ");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.message("failed to delete profile");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
