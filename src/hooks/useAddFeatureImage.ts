"use client";
import { uploadFeatureImage } from "@/actions/uploadFeatureImage";
import { setFeatureImageUrl } from "@/featurs/editorSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useUploadfeatureImage = () => {
  const dispatch = useDispatch();

  const { mutate, isPending, data } = useMutation({
    mutationFn: uploadFeatureImage,
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error?.message);
      }
      if (data?.success) {
        toast.message("image uploaded  successfully");
        if (data.data) dispatch(setFeatureImageUrl(data?.data));
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
