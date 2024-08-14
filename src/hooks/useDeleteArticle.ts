"use client";
import { useMutation } from "@tanstack/react-query";
import { DeleteSingleArticle } from "@/actions/deleteSingleArticle";
import { toast } from "sonner";

export const useDeleteArticle = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: DeleteSingleArticle,
    onSuccess: (data) => {

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
