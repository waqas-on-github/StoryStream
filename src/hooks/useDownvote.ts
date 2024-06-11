"use client";
import { downVote } from "@/actions/downVote";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDownvote = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: downVote,
    onSuccess: (data) => {
      console.log(data);

      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("downVote added ");
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
  };
};
