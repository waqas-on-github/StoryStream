"use client";
import { deleteComment } from "@/actions/deleteComment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteComment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      console.log(data);

      if (!data?.success) {
        toast.message("falied to delete comment");
      }
      if (data?.success) {
        toast.message("comment deleted");
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error("failed to delete comment");
    },
  });

  return {
    mutate,
    isPending,
  };
};
