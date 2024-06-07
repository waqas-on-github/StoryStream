"use client";
import { getBlogData } from "@/actions/getBlogData";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostData = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: getBlogData,
    onSuccess: (data) => {
      console.log(data);

      if (data.error || !data.success) {
        toast.message("falied to add post");
      }
      if (data.data?.id) {
        toast.message("post added successsfully ");
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error("failed to add post");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
