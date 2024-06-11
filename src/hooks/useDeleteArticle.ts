"use client";
import { DeleteSingleArticle } from "@/actions/deleSingleArticle";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteArticle = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: DeleteSingleArticle,
    onSuccess: (data) => {
      console.log(data);

      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("article deleted successfully");
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
