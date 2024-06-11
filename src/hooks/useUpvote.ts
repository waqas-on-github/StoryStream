"use client";
import { upVote } from "@/actions/upvote";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpvote = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: upVote,
    onSuccess: (data) => {
      console.log(data);

      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("upvote added ");
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
