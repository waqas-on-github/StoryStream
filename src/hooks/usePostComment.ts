import { addComment } from "@/actions/addComment";
import { updateComment } from "@/actions/updateComment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CommentData {
  slug: string;
  comment: string;
  commentType: "add" | "edit";
  commentId?: string;
}

export const usePostComment = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: CommentData) => {
      if (inputs.commentType === "add") {
        return await addComment(inputs);
      } else if (
        inputs.commentType === "edit" &&
        inputs.commentId &&
        typeof inputs.commentId === "string"
      ) {
        return await updateComment(inputs);
      }
    },
    onSuccess: (data) => {
      if (data?.error || !data?.success) {
        toast.message("Failed to post comment");
      } else {
        toast.message("Comment posted successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to  post comment");
    },
  });

  return {
    mutate,
    isPending,
  };
};
