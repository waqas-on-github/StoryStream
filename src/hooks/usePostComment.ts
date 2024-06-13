"use client";
import { addComment } from "@/actions/addComment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostComment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      if (data?.error || !data?.success) {
        toast.message("falied to add comment");
      }
      if (data?.success) {
        toast.message("comment added ");
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error("failed to add comment");
    },
  });

  return {
    mutate,
    isPending,
  };
};
