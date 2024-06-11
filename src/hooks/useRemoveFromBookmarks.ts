"use client";
import { unBookmarkArticle } from "@/actions/unBookmarkArticle";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRemoveFromBookmarks = () => {
  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: unBookmarkArticle,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        router.push("/profile/bookmarks");
        toast.message("article removed from bookmarks  successfully");
      }
    },
    onError: (error) => {
      toast.message(error.message);
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
