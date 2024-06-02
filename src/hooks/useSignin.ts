"use client";
import { signIn } from "@/actions/logIn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignin = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("account verified successfully");
      }
    },
    onError: (error) => {
      toast.message("some thing went wrong");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
