"use client";
import { SubmitArticle } from "@/actions/submitArticle";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostArticle = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: SubmitArticle,
    onSuccess: (data) => {
      if (data.error || !data.success) {
        toast.message("falied to add post");
      }
      if (data.data?.id) {
        toast.message("post added successsfully ");
      }
    },
    onError: (error) => {
      toast.error("failed to add post");
    },
  });

  return {
    mutate,
    isPending,
  };
};
