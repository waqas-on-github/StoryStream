"use client";
import { bookmarkArticle } from "@/actions/bookmarkArticle";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAddToBookmark = () => {
  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: bookmarkArticle,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        router.push("/profile/bookmarks");
        toast.message("article bookmarked  successfully");
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
