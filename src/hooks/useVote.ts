"use client";
import { addVote } from "@/actions/vote";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVote = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: addVote,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message(data.message);
      }
    },
    onError: (error) => {
      console.log(error);

      toast.message(error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
