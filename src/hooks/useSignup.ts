"use client";
import { signUp } from "@/actions/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignUp = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);

      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("account created successfully");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.message("some thing went wrong");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
