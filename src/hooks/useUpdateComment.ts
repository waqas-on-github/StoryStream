"use client";
import { updateComment } from "@/actions/updateComment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateComment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {

      if (data?.error || !data?.success) {
        toast.message("falied to update comment");
      }
      if (data?.success) {
        toast.message("comment updated ");
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error("failed to update comment");
    },
  });

  return {
    mutate,
    isPending,
  };
};
