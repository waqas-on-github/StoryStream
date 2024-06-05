"use client";
import { getBlogData } from "@/actions/getBlogData";
import { useMutation } from "@tanstack/react-query";

export const usePostData = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: getBlogData,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
